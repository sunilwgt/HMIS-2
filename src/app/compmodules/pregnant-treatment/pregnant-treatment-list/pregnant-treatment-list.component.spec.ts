import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantTreatmentListComponent } from './pregnant-treatment-list.component';

describe('PregnantTreatmentListComponent', () => {
  let component: PregnantTreatmentListComponent;
  let fixture: ComponentFixture<PregnantTreatmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnantTreatmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnantTreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
