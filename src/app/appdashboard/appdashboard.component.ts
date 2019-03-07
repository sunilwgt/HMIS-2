import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'hmis-appdashboard',
  templateUrl: './appdashboard.component.html',
  styleUrls: ['./appdashboard.component.scss']
})
export class AppdashboardComponent implements OnInit {
  public leftmenuwidth: any = document.getElementById("#test");

  constructor(public commonService: CommonService) {

  }


  ngOnInit() {

  }

}
