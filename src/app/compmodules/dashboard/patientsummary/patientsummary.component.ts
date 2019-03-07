import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'hmis-patientsummary',
  template: `<canvas #peopleSummary></canvas>`,
  styleUrls: ['./patientsummary.component.scss']
})
export class PatientsummaryComponent implements OnInit  {
  //'./patientsummary.component.html'

  @ViewChild('peopleSummary') canvasElement: any;

  private _canvasRef:any;

  constructor() { }

  ngOnInit() {
    this._canvasRef = this.canvasElement.nativeElement;
    this._canvasRef.height = 80;
    this.createChart();
  }


  createChart():void{
    let barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May'],
			datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          data:[2,3,1,4,2]
        },
        {
          label: 'Dataset 2',
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          data:[1,2,5,8,6]
       },
       {
          label: 'Dataset 3',
          backgroundColor: "rgba(255, 205, 86, 0.5)",
          borderColor: "rgb(255, 205, 86)",
          borderWidth: 1,
          data:[6,7,1,4,3]
      }
    ]

		};
    let myChart = new Chart(this._canvasRef, {
        type: 'bar',
        labels: ['January', 'February'],
        data: barChartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
   }

}

