import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { StateService, PATIENT_ADD } from '../../../services/state.service';
import { RL_REGISTRATION, MODE_STATE, MODE_ADD, ACTION_BUTTON_STATE, ADD, RL_USERTYPE, RL_USER } from '../../../models/common';
import { BaseServices } from '../../../utils/base.service';
import { State } from '../../../models/state';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'lodash';
import {CalendarModule} from 'primeng/calendar';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-userheader-buttons',
  templateUrl: './userheader-buttons.component.html',
  styleUrls: ['./userheader-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserHeaderButtonsComponent implements OnInit {

  private _state: State;
  private _sObj: State;
  private csvData = [];
  private searchStr: string;

  private dateValueto: Date;
  private dateValuefrom: Date; ''
  private convertedfromdate;
  private convertedtodate;
  @Input() csvjson: any;
  constructor(private baseservice: BaseServices) { }

  ngOnInit() {
    this._state = this.baseservice.stateService.createState(MODE_STATE);
    this._sObj = this.baseservice.stateService.createState(ACTION_BUTTON_STATE);
    this.getdate();
  this.baseservice.hmisApi.patientSearch(this.convertedfromdate, this.convertedtodate, '');

    // this.searchdropdown()
  }
//   searchdropdown(){
// document.getElementById('searchdropdown').selectedIndex = -1;
//   }


searchPatient() {
  console.log('enter')
  this.convertdate();
  this.baseservice.hmisApi.patientSearch(this.convertedfromdate, this.convertedtodate, '');

}

getdate() {
  const data = new Date();
  this.dateValuefrom = data;
  this.dateValueto = data;
  this.convertdate();
}



convertdate() {
 const a = this.baseservice.comonService.convertdate(this.dateValuefrom , this.dateValueto)
 this.convertedfromdate = a.from;
// this.convertedfromdate = "01-Jan-2019";
 this.convertedtodate = a.to;
 this.setdate(this.convertedfromdate , this.convertedtodate);

}

setdate(f, t) {
  this.baseservice.comonService.setdateforregsearch(f,t)
    }

  private addnewuser(): void {
    this._state.currentstate = MODE_ADD;
    this._state.stateData = null;
    this.baseservice.compLoadManager.redirect(RL_USER)

    this._sObj.currentstate = ADD;
    this.baseservice.stateService.updateState(this._sObj);
  }

  private searchPatientstring(): void {
    this.baseservice.hmisApi.patientSearch(this.convertedfromdate, this.convertedtodate, this.searchStr);
  }

  exportToCSV() {
    console.log('data' , this.csvjson)
    _.forEach(this.csvjson, (value, key) => {
      var newArray: any = {
        "firstname": value.first_name,
        "last_name": value.last_name,
        "email": value.user_name,
        "cretedon": value.created_date
      };
      this.csvData.push(newArray);
    });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      headers: ["First Name", "Last Name", "Email", "createdon"]
    };
    new Angular2Csv(this.csvData, 'Users list', options);
  }

}
