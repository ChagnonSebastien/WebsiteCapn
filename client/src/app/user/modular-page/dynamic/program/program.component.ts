import { Http, Response } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicComponent } from '../dynamic.component';
import { ProgramType } from './program-type';
import { Category } from './category';
import { SERVER_URL, SERVER_PORT } from '../../../../config';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: [ './program.component.scss' ]
})
export class ProgramComponent extends DynamicComponent implements OnInit {

  private type: ProgramType;
  private programName: String;
  private categories: Category[];
  public loaded: boolean;

  constructor(private http: Http) {
    super();
    this.categories = [];
    this.loaded = false;
  }

  ngOnInit() {
    this.http
      .get(`http://${SERVER_URL}:${SERVER_PORT}/amilia-proxy/programs/${this.context.programID}`)
      .toPromise()
      .then((value: Response) => {
        this.processJson(JSON.parse(value.text()));
        this.loaded = true;
      })
      .catch(reason => console.log(reason));
  }

  private processJson(value: any): void {
    this.programName = value.Items[0].ProgramName;
    value.Items
      .filter(activity => {
        return !this.context.hideFull || activity.SpotsRemaining > 0;
      })
      .forEach(activity => {
      if (!this.context.onlyOneCategory || this.context.category === activity.CategoryName) {
        let targetCategory = this.getCategory(activity.CategoryName)[0];
        if (targetCategory === undefined) {
          targetCategory = new Category(activity.CategoryName);
          this.categories.push(targetCategory);
        }
        targetCategory.newItem(activity);
      }
    });
  }

  private getCategory(name: String): Category[] {
    return this.categories.filter((category: Category) => {
      return category.name === name;
    });
  }

}
