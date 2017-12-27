import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../dynamic.component';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent extends DynamicComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
