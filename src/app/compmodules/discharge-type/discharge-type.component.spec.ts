import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeTypeComponent } from './discharge-type.component';

describe('DischargeTypeComponent', () => {
  let component: DischargeTypeComponent;
  let fixture: ComponentFixture<DischargeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
