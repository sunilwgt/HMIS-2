import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceRenewalComponent } from './licence-renewal.component';

describe('LicenceRenewalComponent', () => {
  let component: LicenceRenewalComponent;
  let fixture: ComponentFixture<LicenceRenewalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceRenewalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
