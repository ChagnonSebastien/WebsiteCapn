import { Component, OnInit } from '@angular/core';
import { Quill } from 'quill';

@Component({
  selector: 'app-generic-text',
  templateUrl: './generic-text.component.html',
  styleUrls: ['./generic-text.component.css']
})
export class GenericTextComponent implements OnInit {

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

  constructor() { }

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