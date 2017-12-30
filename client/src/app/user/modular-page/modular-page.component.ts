import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { ActivatedRoute, Data, UrlSegment } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { DynamicComponent } from './dynamic/dynamic.component';
import { ProgramComponent } from './dynamic/program/program.component';
import { GenericTextComponent } from './dynamic/generic-text/generic-text.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-modular-page',
  template: '<div #container></div>'
})
export class ModularPageComponent implements OnInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRefs: ComponentRef<{}>[];

  constructor(private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentRefs = [];
  }

  public ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.componentRefs.forEach((component: ComponentRef<{}>) => {
        component.destroy();
      });
      this.componentRefs = [];

      data['pageData'].forEach((componentData: any) => {
        console.log(componentData);
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent(componentData.type));
        const componentRef = this.container.createComponent(factory);
        this.componentRefs.push(componentRef);

        const instance = <DynamicComponent> componentRef.instance;
        instance.context = componentData.context;
      });

    });
  }

  private getComponent(name: String): Type<any> {
    switch (name) {
      case 'ProgramComponent':
      return ProgramComponent;

      case 'GenericTextComponent':
      return GenericTextComponent;
    }
  }

  public ngOnDestroy() {
    this.componentRefs.forEach((component: ComponentRef<{}>) => {
      component.destroy();
    });
  }

}
