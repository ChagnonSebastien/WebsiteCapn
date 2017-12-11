import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTextComponent } from './generic-text.component';

describe('GenericTextComponent', () => {
  let component: GenericTextComponent;
  let fixture: ComponentFixture<GenericTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
