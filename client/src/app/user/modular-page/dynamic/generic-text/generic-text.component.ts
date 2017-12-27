import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { DynamicComponent } from '../dynamic.component';

@Component({
  selector: 'app-generic-text',
  template: '<div class="container" #container></div>'
})
export class GenericTextComponent extends DynamicComponent implements OnInit {

  @ViewChild('container') container: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    this.container.nativeElement.innerHTML = this.context.innerHtml;
  }

}
