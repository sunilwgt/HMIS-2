import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionTypeComponent } from './admission-type.component';

describe('AdmissionTypeComponent', () => {
  let component: AdmissionTypeComponent;
  let fixture: ComponentFixture<AdmissionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
