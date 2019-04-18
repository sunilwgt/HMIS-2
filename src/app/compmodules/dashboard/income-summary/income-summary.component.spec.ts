import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSummaryComponent } from './income-summary.component';

describe('IncomeSummaryComponent', () => {
  let component: IncomeSummaryComponent;
  let fixture: ComponentFixture<IncomeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
