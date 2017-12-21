import { RouteNode } from './../../route-node';
import { UserModule } from './../user.module';
import { BaseComponent } from '../base/base.component';
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

@Component({
  selector: 'app-navbar',
  template: '<div #container></div>'
})
export class NavbarComponent implements OnInit {

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
        selector: 'runtime-navbar',
        template: this.buildNavbarTemplate(data['routes']),
        styleUrls: ['./navbar.component.css']
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
    const cmpClass = componentClass || class RuntimeComponent { name = 'Denys'; };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule, RouterModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private buildNavbarTemplate(routes: RouteNode) {
    const template: String[] = [];
    template.push(
      `<nav class="navbar navbar-toggleable-md navbar-inverse bg-primary fixed-top">`,
      `<div class="container">`,
      `<button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">`,
      `<span class="navbar-toggler-icon"></span>`,
      `</button>`,
      `<a class="navbar-brand" [routerLink]="['/app']">`,
      `<img src="/assets/logo_bleu_rev.svg" alt="logo" id="logo">`,
      `</a>`,
      `<div class="collapse navbar-collapse" id="navbarNavDropdown">`,
      `<ul class="navbar-nav">`,
      `<li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" [routerLink]="['/app']">`,
      `<a class="nav-link">${routes.fullName}<span class="sr-only">(current)</span></a>`,
      `</li>`
    );

    routes.children.forEach((routeNode: RouteNode) => {
      if (routeNode.children.length > 0) {
        template.push(
          `<li class="nav-item dropdown" routerLinkActive="active">`,
          `<a
            class="nav-link
            dropdown-toggle"
            id="coursDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">`,
          routeNode.fullName,
          `</a>`,
          `<div class="dropdown-menu" aria-labelledby="coursDropdownMenuLink">`
        );

        routeNode.children.forEach((childrenRouteNode: RouteNode) => {
          template.push(`
            <a class="dropdown-item"
               [routerLink]="['/app', '${routeNode.pathName}', '${childrenRouteNode.pathName}']">
              ${childrenRouteNode.fullName}
            </a>
          `);
        });

        template.push(`</div></li>`);
      } else {
        template.push(`
          <li class="nav-item" routerLinkActive="active" [routerLink]="['/app', '${routeNode.pathName}']">
            <a class="nav-link">${routeNode.fullName}</a>
          </li>
        `);
      }
    });

    template.push(
      `</ul>`,
      `<ul class="navbar-nav ml-auto">`,
      `<li class="nav-item">`,
      `<a class="nav-link" target="_blank" href="https://www.facebook.com/clubCAPN/">`,
      `<img src="/assets/logo_facebook.svg" alt="facebook" id="facebook-logo">`,
      `</a>`,
      `</li>`,
      `</ul>`,
      `</div>`,
      `</div>`,
      `</nav>`
    );

    return template.join('');
  }
}
