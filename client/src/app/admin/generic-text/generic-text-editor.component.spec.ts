import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTextEditorComponent } from './generic-text-editor.component';

describe('GenericTextComponent', () => {
  let component: GenericTextEditorComponent;
  let fixture: ComponentFixture<GenericTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
