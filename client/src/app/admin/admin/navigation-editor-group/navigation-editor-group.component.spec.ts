import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEditorGroupComponent } from './navigation-editor-group.component';

describe('GenericTextComponent', () => {
  let component: NavigationEditorGroupComponent;
  let fixture: ComponentFixture<NavigationEditorGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationEditorGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
