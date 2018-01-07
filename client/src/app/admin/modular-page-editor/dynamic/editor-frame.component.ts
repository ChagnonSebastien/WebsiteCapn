import {
  Component,
  OnInit,
  Type,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Output,
  EventEmitter
} from '@angular/core';
import { OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { DynamicEditorComponent } from './dynamic-editor.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ADMIN_COMPONENTS } from '../../admin.config';

@Component({
  selector: 'app-editor-frame',
  templateUrl: './editor-frame.component.html',
  styleUrls: ['./editor-frame.component.scss']
})
export class EditorFrameComponent implements OnInit, OnDestroy {

  private ngOnInitDone: boolean;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private _type: string;

  @Input('type') set type(type: string) {
    this._type = type;
    if (this.ngOnInitDone) {
      this.buildComponent();
    }
  }

  @Input('module')
  private module: any;

  @Output()
  private save: EventEmitter<void>;

  private componentRef: ComponentRef<DynamicEditorComponent>;

  private contextModified: boolean;

  private contextModifiedSubject: Subject<boolean>;

  private contextModifiedSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.save = new EventEmitter<void>();
    this.contextModified = false;
    this.ngOnInitDone = false;
  }

  ngOnInit() {
    this.buildComponent();
    this.ngOnInitDone = true;
  }

  private buildComponent() {
    if (this.componentRef) {
      this.ngOnDestroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(ADMIN_COMPONENTS.get(this._type));
    this.componentRef = this.container.createComponent(factory);

    const contextModifiedSubject = new Subject<boolean>();
    this.contextModifiedSubscription = contextModifiedSubject.subscribe(modified => this.contextModified = modified);

    const instance = this.componentRef.instance;
    instance.context = this.module.context;
    instance.contextModifiedEmitter = contextModifiedSubject;
  }

  private saveComponent() {
    this.save.emit();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
    this.contextModifiedSubscription.unsubscribe();
  }

}
