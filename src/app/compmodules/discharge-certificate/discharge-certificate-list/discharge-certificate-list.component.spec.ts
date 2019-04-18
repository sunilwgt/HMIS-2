import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeCertificateListComponent } from './discharge-certificate-list.component';

describe('DischargeCertificateListComponent', () => {
  let component: DischargeCertificateListComponent;
  let fixture: ComponentFixture<DischargeCertificateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeCertificateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
