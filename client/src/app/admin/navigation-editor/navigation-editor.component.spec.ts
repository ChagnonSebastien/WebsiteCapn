import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEditorComponent } from './navigation-editor.component';

describe('AdminComponent', () => {
  let component: NavigationEditorComponent;
  let fixture: ComponentFixture<NavigationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
