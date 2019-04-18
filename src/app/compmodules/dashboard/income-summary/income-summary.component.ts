import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'hmis-income-summary',
  template: `<canvas #incomeSummary></canvas>`,
  styleUrls: ['./income-summary.component.scss']
})
export class IncomeSummaryComponent implements OnInit {

  @ViewChild('incomeSummary') canvasElement: any;

  private _canvasRef:any;

  constructor() { }

  ngOnInit() {
    this._canvasRef = this.canvasElement.nativeElement;
    this._canvasRef.height = 110;
    this.createChart();
  }

  private createChart():void{
    var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
            data:[2,3,1,4,2]
          }
      ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Income summary INR'
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						stacked: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
            },
            ticks: {
              beginAtZero:true
            }
					}]
				}
			}
		};
    let myChart = new Chart(this._canvasRef, config);
  }

}
