import { RouteNode } from './../../route-node';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ActivatedRoute, Data, RouterModule, Router, NavigationEnd, Event } from '@angular/router';
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
  ModuleWithComponentFactories,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../user-routing.module';
import { UserModule } from '../user.module';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-navbar',
  template: '<div #container></div>'
})
export class NavbarComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private routes: RouteNode;

  private componentRef: ComponentRef<{}>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.routes = data['routes'];
      this.buildNavbar();
    });

    this.router.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd) {
        if (this.container.element.nativeElement.clientWidth < 992) {
          this.buildNavbar();
        } else if (val.urlAfterRedirects.split('/').length > 3) {
          this.buildNavbar();
        }
        window.scrollTo(0, 0);
      }
    });
  }

  private buildNavbar() {
    const metadata = {
      selector: 'runtime-navbar',
      template: this.buildNavbarTemplate(),
      styleUrls: ['./navbar.component.scss']
    };

    const factory = this.createComponentFactorySync(this.compiler, metadata, null);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const decoratedCmp = Component(metadata)(class RuntimeNavbar{});

    @NgModule({
      imports: [CommonModule, RouterModule, MDBBootstrapModule.forRoot()],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [decoratedCmp]
    })
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private buildNavbarTemplate() {
    const template: String[] = [];
    template.push(
      `<mdb-navbar SideClass="navbar navbar-expand-lg navbar-dark capn-color fixed-top scrolling-navbar">`,
      `<logo><a class="navbar-brand" [routerLink]="['/app']">`,
      `<img src="/assets/logo_bleu_rev.svg" alt="logo" id="logo">`,
      `</a></logo>`,
      `<links>`,
      `<ul class="navbar-nav mr-auto">`,
      `<li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">`,
      `<a class="nav-link waves-light" mdbRippleRadius [routerLink]="['/app']">${this.routes.fullName}</a>`,
      `</li>`
    );

    this.routes.children.forEach((routeNode: RouteNode) => {
      if (routeNode.placement !== 'navbar') {
        return;
      }

      if (routeNode.children.length > 0 && routeNode.children.length < 0) {
        template.push(
          `<li class="nav-item dropdown" dropdown>`,
          `<a dropdownToggle mdbRippleRadius type="button" class="nav-link dropdown-toggle waves-light" mdbRippleRadius>`,
          routeNode.fullName,
          `<span class="caret"></span>`,
          `</a>`,
          `<div *dropdownMenu class="dropdown-menu dropdown dropdown-primary" role="menu">`
        );

        routeNode.children.forEach((childrenRouteNode: RouteNode) => {
          template.push(`
            <a class="dropdown-item waves-light"
               mdbRippleRadius
               [routerLink]="['/app', '${routeNode.pathName}', '${childrenRouteNode.pathName}']">
              ${childrenRouteNode.fullName}
            </a>
          `);
        });

        template.push(`</div></li>`);
      } else {
        template.push(`
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link waves-light" mdbRippleRadius [routerLink]="['/app', '${routeNode.pathName}']">${routeNode.fullName}</a>
          </li>
        `);
      }
    });

    template.push(
      `</ul>`,
      `<a class="navbar-text" target="_blank" href="https://www.facebook.com/clubCAPN/">`,
      `<img src="/assets/logo_facebook.svg" alt="facebook" id="facebook-logo">`,
      `</a>`,
      `</links>`,
      '</mdb-navbar>'
    );

    return template.join('');
  }
}
