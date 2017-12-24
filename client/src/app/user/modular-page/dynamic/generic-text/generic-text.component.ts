import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../dynamic.component';

@Component({
  selector: 'app-generic-text',
  templateUrl: './generic-text.component.html',
  styleUrls: ['./generic-text.component.scss']
})
export class GenericTextComponent extends DynamicComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
