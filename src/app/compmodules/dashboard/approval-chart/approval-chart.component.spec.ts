import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalChartComponent } from './approval-chart.component';


describe('ApprovaChartComponent', () => {
  let component: ApprovalChartComponent;
  let fixture: ComponentFixture<ApprovalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
