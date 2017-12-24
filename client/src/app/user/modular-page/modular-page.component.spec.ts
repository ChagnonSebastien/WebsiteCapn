import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularPageComponent } from './modular-page.component';

describe('ModularPageComponent', () => {
  let component: ModularPageComponent;
  let fixture: ComponentFixture<ModularPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModularPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
