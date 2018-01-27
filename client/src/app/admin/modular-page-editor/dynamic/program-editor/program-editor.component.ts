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

  private categories: string[];

  private amiliaRequest: Subscription;

  constructor(private http: Http) {
    super();

    this.loaded = false;
  }

  ngOnInit() {
    if (this.context.programID) {
      this.loadProgram();
    }
  }

  private loadProgram(): void {
    this.loaded = false;
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

      /* this.amiliaRequest
      .then((value: Response) => {
        this.processJson(JSON.parse(value.text()));
        this.loaded = true;
      })
      .catch(reason => console.log(reason)); */
  }

  private parseData(data: any): void {
    console.log(data.Items);
  }

}
