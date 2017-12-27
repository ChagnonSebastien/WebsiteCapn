import { ProgramComponent } from './dynamic/program/program.component';
import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DynamicComponent } from './dynamic/dynamic.component';
import { GenericTextComponent } from './dynamic/generic-text/generic-text.component';

@Component({
  selector: 'app-modular-page',
  template: '<div #container></div>'
})
export class ModularPageComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      // console.log(data['pageData']);
    });

    const factory = this.componentFactoryResolver.resolveComponentFactory(ProgramComponent);
    this.componentRef = this.container.createComponent(factory);

    const instance = <DynamicComponent> this.componentRef.instance;
    instance.context = { innerHtml: '<div class="row"><div class="col col-6">left</div><div class="col col-6">right</div></div>'};
  }

}
