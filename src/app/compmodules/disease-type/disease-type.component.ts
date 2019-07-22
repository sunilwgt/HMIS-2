import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Disease } from '../../models/opd';
import { MODE_ADD, RESULT_TYPE_SET_DISEASE_TYPE, RESULT_TYPE_EDIT_DISEASE_TYPE, UPDATE_FIELD_STATE, PATIENT_ID_STATE, RL_DISEASE_LIST, RESULT_TYPE_DELETE_DISEASE_TYPE, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { patientListOption } from '../../models/patient';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hmis-disease-type',
  templateUrl: './disease-type.component.html',
  styleUrls: ['./disease-type.component.scss']
})
export class DiseaseTypeComponent extends BaseComponent implements OnInit {

  private _tempData: Disease;
  private _updateStateObj: State;
  private _popUpStateObj: State;
  private patientData:any = [];
  private patientList:any = [];

  constructor(baseService: BaseServices , private snackbar:MatSnackBar) {
    super(baseService);
    this.defaultvalidation = false;
  }

  hmisApiSubscribe(data: any): void {
    //console.log(data.resulttype);
    
    if (data.resulttype === RESULT_TYPE_SET_DISEASE_TYPE) {
      //console.log(data.result, data.resulttype);
      this.compLoadManager.redirect(RL_DISEASE_LIST);
      this.hmisApi.getDiseaseTypeSerach("");
      this.compLoadManager.closePopup();
      this.snackbar.open('Disease type Added Successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
    if (data.resulttype === RESULT_TYPE_EDIT_DISEASE_TYPE) {
      this.compLoadManager.redirect(RL_DISEASE_LIST);
      this.hmisApi.getDiseaseTypeSerach("");
      this.compLoadManager.closePopup();
      this.snackbar.open('Disease type Updated Successfully', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }


  ngOnInit() {
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this._popUpStateObj = this.stateService.createState(PATIENT_ID_STATE);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Disease();
    }
  }
 
   private updateAllFields() {
    for (const key in this.compData) {
      if (this.compData.hasOwnProperty(key)) {
        this._updateStateObj.currentstate = key;
        this._updateStateObj.stateData = this.compData;
        this.stateService.updateState(this._updateStateObj);
      }
    }
  }
 

  invokeAddFunction(): void {
const dtypestring  = new String(this.compData.decease_type_name);
const dtypedesc  = new String(this.compData.description);

if (dtypestring.length < 2|| dtypedesc.length < 2){
  const  diseasetypename  = this.isAlphanumericname(this.compData.decease_type_name)
  const diseasetypdesc  = this.isAlphanumericnamedesc(this.compData.decease_type_name)
  if (diseasetypename === true && diseasetypdesc === true){
    this.hmisApi.setDiseaseType(this.compData);
  }else{

    this.snackbar.open('Enter Proper values ', 'Close',
    {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}else {
  this.hmisApi.setDiseaseType(this.compData);
}

  }


 isAlphanumericname(char) {
    return "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) > -1;
}

isAlphanumericnamedesc(char) {
  return "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) > -1;
}
  invokeEditFunction(): void {
    this.hmisApi.setDiseaseTypeAsPerId(this.compData.ID, this.compData);
  }

}
