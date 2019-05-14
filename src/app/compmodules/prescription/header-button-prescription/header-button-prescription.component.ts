import { Component, OnInit } from '@angular/core';
import { State } from '../../../models/state';
import { MODE_ADD, RL_PRESCRIPTION, MODE_STATE, ACTION_BUTTON_STATE, ADD, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION } from '../../../models/common';
import { BaseServices } from '../../../utils/base.service';
import { BaseComponent } from '../../../utils/base.component';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { patientListOption } from '../../../models/patient';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header-button-prescription',
  templateUrl: './header-button-prescription.component.html',
  styleUrls: ['./header-button-prescription.component.scss']
})
export class HeaderButtonPrescriptionComponent extends BaseComponent implements OnInit {
  private _state: State;
  private sObj: State;
  private searchStr: string;
  private patientList = [];
  constructor(baseservice: BaseServices , private snackbar:MatSnackBar) {
    super(baseservice);
  }

  ngOnInit() {
    this._state = this.stateService.createState(MODE_STATE);
    this.sObj = this.stateService.createState(ACTION_BUTTON_STATE);
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION) {
      this.createPatientlist(data.result);
    }
  }

  private createPatientlist(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
  }

  getSelectedHandlerForPrescription(evntObj: any): void {
    this.hmisApi.searchIndividualPatientByIdForPrescription(evntObj.data.id);
  }

  private addprescription(): void {
    // this.openCompInAddMode(RL_PRESCRIPTION);
    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      // alert('not allowed')
      this.snackbar.open('Not Allowed', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {
      this._state.currentstate = MODE_ADD;
      this._state.stateData = null;
      this.compLoadManager.redirect(RL_PRESCRIPTION);
      this.sObj.currentstate = ADD;
      this.stateService.updateState(this.sObj);
    }

  }

  // private searchIndividualPatient(): void {
  //   this.hmisApi.searchIndividualPatientForPrescription(this.searchStr);
  // }

  private onKeyUpSearchForPrescription(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.searchIndividualPatientForPrescription(evntObj.data);
    }
  }

}
