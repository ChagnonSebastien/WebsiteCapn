import { Component, OnInit } from '@angular/core';
import { Quill } from 'quill';
import { DynamicEditorComponent } from '../modular-page-editor/dynamic/dynamic-editor.component';

@Component({
  selector: 'app-generic-text-editor',
  templateUrl: './generic-text-editor.component.html',
  styleUrls: ['./generic-text-editor.component.scss']
})
export class GenericTextEditorComponent extends DynamicEditorComponent implements OnInit {

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
  }

  onEditorCreated(event: Quill) {
    this.editor = event;
    this.editor.pasteHTML(0, this.context.innerHtml);
  }

  onContentChanged(event: any) {
    this.context.innerHtml = event.html;
    this.contextModifiedEmitter.next(true);
  }
}
