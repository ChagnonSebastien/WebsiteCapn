import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, ComponentRef, ComponentFactoryResolver, Type } from '@angular/core';
import { DynamicComponent } from '../../user/modular-page/dynamic/dynamic.component';
import { GenericTextEditorComponent } from '../generic-text/generic-text-editor.component';
import { ProgramEditorComponent } from './dynamic/program-editor/program-editor.component';

@Component({
  selector: 'app-modular-page-editor',
  template: '<div #container></div>'
})
export class ModularPageEditorComponent implements OnInit, OnDestroy {

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
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent(componentData.type));
        const componentRef = this.container.createComponent(factory);
        this.componentRefs.push(componentRef);

        const instance = <DynamicComponent> componentRef.instance;
        instance.context = componentData.context;
      });
    });
  }

  private getComponent(name: String): Type<{}> {
    switch (name) {
      case 'ProgramComponent':
      return ProgramEditorComponent;

      case 'GenericTextComponent':
      return GenericTextEditorComponent;
    }
  }

  public ngOnDestroy() {
    this.componentRefs.forEach((component: ComponentRef<{}>) => {
      component.destroy();
    });
  }

}
