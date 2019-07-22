import { Component, OnInit, Input } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_PATIENT, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENTS, RESULT_TYPE_SET_PRESCRIPTION, RL_PRESCRIPTION_LIST, RESULT_TYPE_SET_PRESCRIPTION_AS_PER_ID, UPDATE_FIELD_STATE, PATIENT_ID_STATE, RESULT_TYPE_GET_PATIENT_SEARCH, RadioData, GET_SELECTED_ITEM, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_PRESCRIPTION, RESULT_TYPE_GET_REGISTERED_PATIENT_LIST, MODE_CURRENT_DATE_ADD, RESULT_TYPE_GET_REGISTERED_REG_NO, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { DoctorOptions } from '../../models/opd';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { patientListOption, Prescription } from '../../models/patient';
import { State } from '../../models/state';
import { Patient, OtCreate } from '../../models/patient';
import { HelperFunction } from '../../utils/helper-function.service';

import { DatePipe } from '@angular/common';
import { CompDataInfo } from '../../models/registration';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent extends BaseComponent implements OnInit {

  private _tempData: Prescription;
  private doctorListOption: Array<DoctorOptions> = [];
  private patientListOption: Array<patientListOption> = [];
  public selectedPatient: Patient = new Patient();
  private genderOptions: Array<RadioData>;
  private patientlist: Array<ISelectOption> = [];
  private isEnabled: boolean = false;
  private labelEnabled: boolean = false;
  private patientList = [];
  private patientData = [];
  private lastInstanceId: string;
  private prescriptionModel: Prescription = new Prescription();
  private prescriptionDate: string;
  private doctor_id: string;

  constructor(baseService: BaseServices, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.defaultvalidation = false;
    this.hmisApi.getDoctorList();
 


  }
  hmisApiSubscribe(data: any): void {

    if (data.resulttype === RESULT_TYPE_GET_REGISTERED_REG_NO) {
      this.createPatientlist(data.result);
    }
    if (data.resulttype === RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID) {
      this.patientData = data.result;
      this.compData = this.patientData;
      this.compData.patient_name = this.compData[0].patient_first_name + ' ' + this.compData[0].patient_last_name;
      this.compData.patient_age = this.compData[0].patient_age;
      this.compData.patient_sex = this.compData[0].patient_sex;
      this.isEnabled = false;
      this.labelEnabled = true;
    }

    if (data.resulttype === RESULT_TYPE_GET_ALL_DOCTOR_LIST) {
      this.doctorListOption = this.comonService.doctorListOptions(data.result);

    }

    if (data.resulttype === RESULT_TYPE_GET_PATIENTS) {
      this.patientListOption = this.comonService.patientListOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_SET_PRESCRIPTION) {
      this.hmisApi.getPrescriptionSearch("");
      this.compLoadManager.redirect(RL_PRESCRIPTION_LIST);
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_SET_PRESCRIPTION_AS_PER_ID) {
      this.compLoadManager.redirect(RL_PRESCRIPTION_LIST);
      this.hmisApi.getPrescriptionSearch("");
      this.compLoadManager.closePopup();
    }

  }



  private onKeyUpSearchForPatient(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getRegisteredRegNumber(evntObj.data);
    }
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.hmisApi.getRegisteredPatientById(evntObj.data.id);
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




  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Prescription();
    }

    if (this.state.currentstate === MODE_EDIT || this.state.currentstate === MODE_VIEW) {
      this.isEnabled = true;
    }

  }

  protected valueChangeHandler(evt: CompDataInfo): void {
    if (evt.propname === "date") {
      this.prescriptionDate = evt.newval;
    } else if (evt.propname === "doctor_id") {
      this.doctor_id = evt.newval;
    } else {
      this.compData[evt.propname] = evt.newval;
    }
  }

  invokeAddFunction(): void {
    console.log("add " , this.compData)
    this.compData.date = this.prescriptionDate;
    this.compData.doctor_id = this.doctor_id;

    // this.prescriptionModel = this.compData;
    this.prescriptionModel = this.comonService.arrangeDataForPrescription(this.compData);
    this.prescriptionModel.created_by = this.hmisApi.userDetail.created_by;
    this.prescriptionModel.modified_by = this.hmisApi.userDetail.modified_by;
    for (let item of this.doctorListOption) {
      if (this.compData.doctor_id === item.value) {
        this.compData.doctor_name = item.label;
      }
    }
    console.log("add " , this.prescriptionModel)

    this.hmisApi.setPrescription(this.prescriptionModel);
  }

  invokeEditFunction(): void {
    this.compData.date = this.prescriptionDate;
    this.compData.doctor_id = this.doctor_id;
    this.prescriptionModel = this.comonService.arrangeDataForPrescriptionForUpdate(this.compData);
    this.prescriptionModel.created_by = this.hmisApi.userDetail.created_by;
    this.prescriptionModel.modified_by = this.hmisApi.userDetail.modified_by;
    for (let item of this.doctorListOption) {
      if (this.compData.doctor_id === item.value) {
        this.compData.doctor_name = item.label;
      }
    }
    this.hmisApi.setPrescriptionAsPerId(this.compData.ID, this.prescriptionModel);
  }

}
