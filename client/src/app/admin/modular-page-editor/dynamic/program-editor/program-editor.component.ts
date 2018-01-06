import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../../../../user/modular-page/dynamic/dynamic.component';

@Component({
  selector: 'app-program-editor',
  templateUrl: './program-editor.component.html',
  styleUrls: ['./program-editor.component.scss']
})
export class ProgramEditorComponent extends DynamicComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
