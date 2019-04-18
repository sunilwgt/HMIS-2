import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionTypeListComponent } from './admission-type-list.component';

describe('AdmissionTypeListComponent', () => {
  let component: AdmissionTypeListComponent;
  let fixture: ComponentFixture<AdmissionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
