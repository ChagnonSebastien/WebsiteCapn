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
        styleUrls: ['./footer.component.scss']
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
    const decoratedCmp = Component(metadata)(class RunetimeFooter{});

    @NgModule({ imports: [CommonModule, RouterModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private buildFooterTemplate(routes: RouteNode) {
    const template: String[] = [];
    template.push(
      `<footer class="page-footer capn-color center-on-small-only">`,
      `<div class="container">`,
      `<div class="row">`,
      `<div class="col-md-6">`,
      `</div>`,
      `<div class="col-md-6">`,
      `<h5 class="title">Liens</h5>`,
      `<ul>`
      /* `<nav class="footer bg-primary text-white">`,
      `<div class="container">`,
      `<div class="row">`,
      `<div class="col-sm">`,
      `<br>`,
      `<div class="col-sm">` */
    );

    routes.children.forEach((routeNode: RouteNode) => {
      if (routeNode.placement !== 'footer') {
        return;
      }

      template.push(`<li><a [routerLink]="['/app', '${routeNode.pathName}']">${routeNode.fullName}</a></li>`);
    });

    template.push(
      `</ul>`,
      `</div>`,
      `</div>`,
      `</div>`,
      `<div class="footer-copyright">`,
      `<div class="container-fluid">`,
      `Site conçu par Sébastien Chagnon &copy; 2017 Tout droits réservés.`,
      `</div>`,
      `</div>`,
      `</footer>`
    );

    return template.join('');
  }
}
