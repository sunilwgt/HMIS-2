import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_APPROVER_DASHBOARD_LIST, RESULT_TYPE_GET_APPROVER_DASHBOARD_LISTT, RESULT_TYPE_GET_PENDING_LIST_FOR_CHART, RESULT_TYPE_GET_APPROVED_LIST_FOR_CHART, RESULT_TYPE_GET_REJECTED_LIST_FOR_CHART } from '../../../models/common';

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
	pendinglength;
	rejectedlength;

	constructor(baseService: BaseServices) {
		super(baseService);
		// this.hmisApi.getApproverDashboardListt(" ");
	}


	hmisApiSubscribe(data: any): void {

		if (data.resulttype === RESULT_TYPE_GET_PENDING_LIST_FOR_CHART) {
			// console.log('pending data', data);
			this.pendinglength = data.result.length;
			// console.log('pending length', this.pendinglength);
			this.hmisApi.getApprovedListforchart(" ");
		}

		if (data.resulttype === RESULT_TYPE_GET_APPROVED_LIST_FOR_CHART) {
			// console.log('approved data', data);
			this.approvedlength = data.result.length;
			// console.log('approvedlength length', this.approvedlength);
			this.hmisApi.getrejectedListforchart(" ");
		}

		if (data.resulttype === RESULT_TYPE_GET_REJECTED_LIST_FOR_CHART) {
			// console.log('rejected data', data);
			this.rejectedlength = data.result.length;
			// console.log('rejectedlength length', this.rejectedlength);

		// console.log('all length' , this.pendinglength , this.rejectedlength , this.approvedlength);
		this.createChart(this.approvedlength , this.pendinglength , this.rejectedlength);


		}

	}

	ngOnInit() {
		this._canvasRef = this.canvasElement.nativeElement;
		this.hmisApi.getPendingforchart(" ");
	}

	private createChart(a, p,r): void {
		var config = {
			type: 'pie',
			data: {
				labels: ["Approved", "Pending" , "Rejected"],
				datasets: [{
					data: [a, p , r],
					backgroundColor: [
						"rgb(44, 204, 34)",
						"rgb(255,0,0)",
						"rgb(70, 128, 255)",
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
