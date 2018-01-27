import { SERVER_PORT, SERVER_URL } from './../../../../config';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { DynamicEditorComponent } from '../dynamic-editor.component';
import { Subscription } from 'rxjs/Subscription';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-program-editor',
  templateUrl: './program-editor.component.html',
  styleUrls: ['./program-editor.component.scss']
})
export class ProgramEditorComponent extends DynamicEditorComponent implements OnInit {

  private loaded: boolean;

  private categories: {value: string, label: string}[];

  private amiliaRequest: Subscription;

  private randomToken: string;

  constructor(private http: Http) {
    super();

    this.loaded = false;
    this.randomToken = Math.random().toString();
  }

  ngOnInit() {
    if (this.context.programID) {
      this.loadProgram();
    } else {
      this.context.onlyOneCategory = false;
      this.context.category = '';
      this.context.hideFull = true;
      this.context.placesLeft = true;
      this.context.price = false;
      this.context.age = false;
      this.context.start = false;
      this.context.time = false;
      this.context.shop = true;
    }
  }

  private loadProgram(): void {
    if (this.loaded) {
      this.context.onlyOneCategory = false;
      this.context.category = '';
      this.loaded = false;
    }

    if (this.amiliaRequest) {
      this.amiliaRequest.unsubscribe();
    }

    if (this.context.programID !== '') {
      this.amiliaRequest = this.http
        .get(`http://${SERVER_URL}:${SERVER_PORT}/amilia-proxy/programs/${this.context.programID}`)
        .subscribe((value: Response) => {
          this.parseData(JSON.parse(value.text()));
          this.loaded = true;
          this.contextModifiedEmitter.next(true);
        });
    }
  }

  private parseData(data: any): void {
    this.categories = this.removeDuplicates(data.Items.map((activity: any) => {
      return activity.CategoryName;
    })).map((category: string) => {
      return { value: category, label: category };
    });
  }

  private removeDuplicates(array: string[]): string[] {
    const uniques = array.filter((elem, index, self) => {
        return index === self.indexOf(elem);
    });

    return uniques;
}

}
