import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryTypeComponent } from './surgery-type.component';

describe('SurgeryTypeComponent', () => {
  let component: SurgeryTypeComponent;
  let fixture: ComponentFixture<SurgeryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
