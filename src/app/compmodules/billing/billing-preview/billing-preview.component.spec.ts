import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPreviewComponent } from './billing-preview.component';

describe('BillingPreviewComponent', () => {
  let component: BillingPreviewComponent;
  let fixture: ComponentFixture<BillingPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
