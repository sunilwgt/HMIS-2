import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeListComponent } from './delivery-type-list.component';

describe('DeliveryTypeListComponent', () => {
  let component: DeliveryTypeListComponent;
  let fixture: ComponentFixture<DeliveryTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
