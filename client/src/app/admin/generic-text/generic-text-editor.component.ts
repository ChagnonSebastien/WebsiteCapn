import { Component, OnInit } from '@angular/core';
import { Quill } from 'quill';
import { DynamicComponent } from '../../user/modular-page/dynamic/dynamic.component';

@Component({
  selector: 'app-generic-text-editor',
  templateUrl: './generic-text-editor.component.html',
  styleUrls: ['./generic-text-editor.component.scss']
})
export class GenericTextEditorComponent extends DynamicComponent implements OnInit {

  private editor: Quill;
  public options =
  {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],

      ['link', 'image', 'video']
    ]
  };

  constructor() {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      console.log();
    }, 2000);
  }

  onEditorCreated(event: Quill) {
    this.editor = event;
  }

  save() {
    console.log(this.editor.root.innerHTML);
  }
}
