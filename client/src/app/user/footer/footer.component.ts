import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Compiler,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  NgModule,
  ModuleWithComponentFactories
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../user-routing.module';
import { RouteNode } from '../../route-node';
import { UserModule } from '../user.module';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-footer',
  template: '<div #container></div>'
})
export class FooterComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      const metadata = {
        selector: 'runtime-footer',
        template: this.buildFooterTemplate(data['routes']),
        styleUrls: ['./footer.component.css']
      };

      const factory = this.createComponentFactorySync(this.compiler, metadata, null);

      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }

      this.componentRef = this.container.createComponent(factory);
    });
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const decoratedCmp = Component(metadata)(class {});

    @NgModule({ imports: [CommonModule, RouterModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private buildFooterTemplate(routes: RouteNode) {
    const template: String[] = [];
    template.push(
      `<nav class="footer bg-primary text-white">`,
      `<div class="container">`,
      `<div class="row">`,
      `<div class="col-sm">`,
      `<div>&copy; 2017 Tout droits réservés.</div>`,
      `<div>Site conçu par Sébastien Chagnon</div>`,
      `<br>`,
      `</div>`,
      `<div class="col-sm">`
    );

    routes.children.forEach((routeNode: RouteNode) => {
      template.push(`<div [routerLink]="['/app', '${routeNode.pathName}']">${routeNode.fullName}</div>`);
    });

    template.push(`</div></div></div></nav>`);

    return template.join('');
  }
}
