import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { StateService, PATIENT_ADD } from '../../../services/state.service';
import { RL_REGISTRATION, MODE_STATE, MODE_ADD, ACTION_BUTTON_STATE, ADD } from '../../../models/common';
import { BaseServices } from '../../../utils/base.service';
import { State } from '../../../models/state';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'lodash';

@Component({
  selector: 'Newregisteration-button',
  templateUrl: './Newregisteration-button.component.html',
  styleUrls: ['./Newregisteration-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewRegisterationButtonComponent implements OnInit {

  private _state: State;
  private _sObj: State;
  private csvData = [];

  private searchStr: string;
  @Input() csvjson: any;
  constructor(private baseservice: BaseServices) { }

  ngOnInit() {
    this._state = this.baseservice.stateService.createState(MODE_STATE);
    this._sObj = this.baseservice.stateService.createState(ACTION_BUTTON_STATE);
  }

  private addNewPatient(): void {
    this.baseservice.stateService.currentstate = MODE_ADD;
    this._state.stateData = null;
    this.baseservice.compLoadManager.redirect(RL_REGISTRATION)

    this._sObj.currentstate = ADD;
    this.baseservice.stateService.updateState(this._sObj);
  }

  private searchPatient(): void {
    this.baseservice.hmisApi.patientSearch(this.searchStr);
  }

  exportToCSV() {
    _.forEach(this.csvjson, (value, key) => {
      var newArray: any = {
        "patient_registration_no": value.patient_registration_no,
        "patient_name": value.patient_name,
        "patient_sex": value.patient_sex,
        "patient_phone": value.patient_phone,
        "patient_age": value.patient_age,
        "doctor_name": value.doctor_name,
        "admitted_on": value.admitted_on
      };
      this.csvData.push(newArray);
    });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      headers: ["Patient registration no.", "Patient name", "Patient sex", "Patient phone no", "Patient age", "Doctor name", "date of admission"]
    };
    new Angular2Csv(this.csvData, 'Patient list', options);
  }

}
