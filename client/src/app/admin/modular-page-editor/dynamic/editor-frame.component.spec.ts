import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFrameComponent } from './editor-frame.component';

describe('EditorFrameComponent', () => {
  let component: EditorFrameComponent;
  let fixture: ComponentFixture<EditorFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
