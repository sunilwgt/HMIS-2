import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDashboardListComponent } from './approvaldashboard-list.component';

describe('ApprovalDashboardListComponent', () => {
  let component: ApprovalDashboardListComponent;
  let fixture: ComponentFixture<ApprovalDashboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
