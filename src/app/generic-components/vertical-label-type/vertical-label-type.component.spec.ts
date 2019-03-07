import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalLabelTypeComponent } from './vertical-label-type.component';

describe('VerticalLabelTypeComponent', () => {
  let component: VerticalLabelTypeComponent;
  let fixture: ComponentFixture<VerticalLabelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalLabelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalLabelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
