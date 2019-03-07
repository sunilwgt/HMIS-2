import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeCertificateComponent } from './discharge-certificate.component';

describe('DischargeCertificateComponent', () => {
  let component: DischargeCertificateComponent;
  let fixture: ComponentFixture<DischargeCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
