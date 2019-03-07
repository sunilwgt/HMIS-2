import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonPrescriptionComponent } from './header-button-prescription.component';

describe('HeaderButtonPrescriptionComponent', () => {
  let component: HeaderButtonPrescriptionComponent;
  let fixture: ComponentFixture<HeaderButtonPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderButtonPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderButtonPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
