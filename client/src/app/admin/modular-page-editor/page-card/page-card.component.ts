import { SelectComponent } from 'ng-mdb-pro/pro/material-select';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ADMIN_COMPONENTS } from '../../admin.config';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {

  private optionsSelect: string[];

  private randomToken: string;

  @Input('page') private page: any;

  @ViewChild('checkbox') private checkbox: HTMLInputElement;

  @Output() private delete: EventEmitter<void>;

  constructor() {
    this.randomToken = Math.random().toString();
    this.optionsSelect = Array.from(ADMIN_COMPONENTS.keys());
    this.delete = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  private toogleVisibility() {
    this.page.visible = !this.page.visible;
  }

  private deleteModule() {
    this.delete.emit();
  }

}
