import { Component, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'hmis-medical-insurance',
  template: `<canvas #medicalInsurance></canvas>`,
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent implements OnInit {

  @ViewChild('medicalInsurance') canvasElement: any;

  private _canvasRef:any;

  constructor() { }

  ngOnInit() {
    this._canvasRef = this.canvasElement.nativeElement;
    this.createChart();
  }

  private createChart():void{
    var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [2,8,4,1],
					backgroundColor: [
						"rgb(252, 97, 128)",
						"rgb(70, 128, 255)",
						"rgb(44, 204, 34)",
						"rgb(38, 218, 210)"
					],
					label: 'Dataset 1'
				}]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Medical insurance'
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
