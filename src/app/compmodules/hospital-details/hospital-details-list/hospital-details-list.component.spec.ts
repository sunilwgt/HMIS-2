import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDetailsListComponent } from './hospital-details-list.component';

describe('HospitalDetailsListComponent', () => {
  let component: HospitalDetailsListComponent;
  let fixture: ComponentFixture<HospitalDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
