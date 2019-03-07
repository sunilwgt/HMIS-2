import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeTypeListComponent } from './discharge-type-list.component';

describe('DischargeTypeListComponent', () => {
  let component: DischargeTypeListComponent;
  let fixture: ComponentFixture<DischargeTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
