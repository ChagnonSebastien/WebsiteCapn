import { Component, OnInit } from '@angular/core';
import { DynamicEditorComponent } from '../dynamic-editor.component';

@Component({
  selector: 'app-program-editor',
  templateUrl: './program-editor.component.html',
  styleUrls: ['./program-editor.component.scss']
})
export class ProgramEditorComponent extends DynamicEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
