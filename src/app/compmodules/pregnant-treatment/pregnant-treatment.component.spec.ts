import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantTreatmentComponent } from './pregnant-treatment.component';

describe('PregnantTreatmentComponent', () => {
  let component: PregnantTreatmentComponent;
  let fixture: ComponentFixture<PregnantTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnantTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnantTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
