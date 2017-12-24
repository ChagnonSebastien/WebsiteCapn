import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DynamicComponent } from './dynamic/dynamic.component';
import { GenericTextComponent } from './dynamic/generic-text/generic-text.component';

@Component({
  selector: 'app-modular-page',
  template: '<h1>Module</h1><div #container></div>',
  styleUrls: ['./modular-page.component.scss']
})
export class ModularPageComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      console.log(data['pageData']);
    });

    const factory = this.componentFactoryResolver.resolveComponentFactory(GenericTextComponent);
    this.componentRef = this.container.createComponent(factory);

    /* const instance = <DynamicComponent> this.componentRef.instance;
    instance.context = this.context; */

  }

}
