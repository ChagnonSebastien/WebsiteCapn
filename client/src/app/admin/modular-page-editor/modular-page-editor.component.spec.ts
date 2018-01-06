import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularPageEditorComponent } from './modular-page-editor.component';

describe('ModularPageEditorComponent', () => {
  let component: ModularPageEditorComponent;
  let fixture: ComponentFixture<ModularPageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModularPageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
