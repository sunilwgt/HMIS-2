import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LISTT } from '../../../models/common';

@Component({
	selector: 'hmis-approval-chart',
	template: `<canvas #approvalchart></canvas>`,
	styleUrls: ['./approval-chart.component.scss']
})
export class ApprovalChartComponent extends BaseComponent implements OnInit {

	@ViewChild('approvalchart') canvasElement: any;

	private _canvasRef: any;
	private notapproveddata = [];
	private approveddata = [];
	 approvedlength;
	 notapprovedlength;

	constructor(baseService: BaseServices) {
		super(baseService);
		this.hmisApi.getApproverDashboardListt(" ");
	}


	hmisApiSubscribe(data: any): void {
		if (data.resulttype === RESULT_TYPE_GET_APPROVER_DASHBOARD_LISTT) {
			this.notapproveddata = [];
			this.approveddata = []
			this.approvedlength  === 0;
			this.notapprovedlength === 0;

			for (let d of data.result) {
				if (d.approval_status_name === 'Approved') {
					this.approveddata.push(d);
				} else {
					this.notapproveddata.push(d);
				}
			}
			this.approvedlength = this.approveddata.length;
			this.notapprovedlength = this.notapproveddata.length;
			this.createChart(this.approvedlength , this.notapprovedlength);
		}
	}

	ngOnInit() {
		this.hmisApi.getApproverDashboardList(" ");

		this._canvasRef = this.canvasElement.nativeElement;

	}

	private createChart(a, n): void {
		var config = {
			type: 'pie',
			data: {
				labels: ["Approved", "Pending"],
				datasets: [{
					data: [a, n],
					backgroundColor: [
						"rgb(44, 204, 34)",
						"rgb(255,0,0)"
						// "rgb(70, 128, 255)",
					],
				}]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Approval Dashboard'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};
		let myChart = new Chart(this._canvasRef, config);
	}

}
