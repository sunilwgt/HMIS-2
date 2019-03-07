import { Component, OnInit } from '@angular/core';
import { ProgressOption, RL_APPROVAL_DASHBOARD_LIST } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';

@Component({
  selector: 'hmis-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  extends BaseComponent implements OnInit {

  private twardList:Array<ProgressOption> = [];
  constructor(baseService: BaseServices) {
		super(baseService);
		// this.hmisApi.getApproverDashboardListt(" ");
	}

  ngOnInit() {
    this.twardList = [
      {label: "Ward 1(5)", value:30, percentage: 30},
      {label: "Ward 2(7)", value:42, percentage: 42},
      {label: "Ward 3(7)", value:52, percentage: 52},
      {label: "Ward 4(8)", value:46, percentage: 46}
    ]
  }


  onapprove(){
    console.log('on approve');
    this.compLoadManager.redirect(RL_APPROVAL_DASHBOARD_LIST);

    
  }

}
