import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NewBorn, DeliveryType, deliveryTypeOptions } from '../../models/opd';
import { UPDATE_FIELD_STATE, RESULT_TYPE_SET_NEW_BORN, RL_NEW_BORN_LIST, MODE_EDIT, MODE_VIEW, RESULT_TYPE_EDIT_NEW_BORN, RESULT_TYPE_DELETE_NEW_BORN, RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN, RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ_FOR_NEWBORN, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_NEWBORN, Option } from '../../models/common';
import { MODE_ADD, RadioData } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { patientListOption } from '../../models/patient';
import { HelperFunction } from '../../utils/helper-function.service';

@Component({
  selector: 'app-new-born',
  templateUrl: './new-born.component.html',
  styleUrls: ['./new-born.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewBornComponent extends BaseComponent implements OnInit {
  private ProfessionOption: Array<Option> = [];

  private genderOptions: Array<RadioData>;
  private bplOption: Array<RadioData>;
  private _updateStateObj: State;
  private deliveryTypeOption: Array<deliveryTypeOptions> = [];
  private patientData = [];
  private patientList = [];
  private admissionid: any;
  private showsearch: boolean = false;
  private iseditable: boolean = true;



  showNav: any = [];

  constructor(baseService: BaseServices, private helperFunc: HelperFunction) {
    super(baseService);
    this.defaultvalidation = false;
    this.showNav[0] = true;
    this.hmisApi.getDeliveryTypeDropdown();
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ_FOR_NEWBORN) {
      this.createPatientlistForNewborn(data.result);
      this.patientData = data.result;
    }
    if (data.resulttype === RESULT_TYPE_GET_PATIENT_DETAILS_FOR_NEWBORN) {
      // this.isEnabled = false;
      for (let value of data.result) {
        this.compData = value;
        this.compData.patient_name = this.compData.patient_first_name + ' ' + this.compData.patient_last_name;
        var patientDob = this.compData.patient_dob === null ? "" : this.compData.patient_dob.split("T");
        this.compData.patient_age = this.helperFunc.getCalculatedAge(patientDob[0]);
      }
    }
    if (data.resulttype === RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN) {
      this.deliveryTypeOption = this.comonService.deliveryTypeListOption(data.result);
    }
    if (data.resulttype === RESULT_TYPE_SET_NEW_BORN) {
      // this.hmisApi.getNewBornSearch("");
      const a = this.comonService.newborndateobserver();
      console.log('new born date observer', a)
      this.hmisApi.getnewborndatewise(a.from, a.to, '');
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_NEW_BORN_LIST);
    }
    if (data.resulttype === RESULT_TYPE_EDIT_NEW_BORN) {
      // this.hmisApi.getNewBornSearch("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_NEW_BORN_LIST);
    }

  }


  ngOnInit() {
    // if (this.state.currentstate === MODE_ADD) {
    //   this.showsearch = true;
    // }
    // if (this.state.currentstate === MODE_EDIT) {
    //   this.iseditable  = false;
    //       }
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.bplOption = this.comonService.radioYesNoOptions;
    this.genderOptions = this.comonService.genderOptions;
    this.ProfessionOption = this.comonService.ProfessionOption;
    console.log('profession option', this.ProfessionOption)
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.showsearch = true;
      this.compData = new NewBorn();
      let item = { Is_malnutrition: false, is_born_critical_illness: false, is_twin: false }
      console.log('default item ', item)
      this.state.stateData = item;
      this.compData = item;
      this.state.currentstate = MODE_EDIT
      this.showSubmitBtn = false;
    }



    if (this.state.currentstate === MODE_EDIT || this.state.currentstate === MODE_VIEW) { }
    this.updateAllFields();
    console.log('final state', this.state)
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
    console.log('compdata' , this.compData)
    // this.updateAllFields();
  }

  private updateNewBornModel(data: any) {
    // this.compData.admission_id = "0be9deca-1662-4ac3-b5dc-0a2d5ec4917f";
    // this.compData.patient_id = "a49e643b-c14d-42f6-9633-4d4d18b009e7";
    this.compData.patient_id = this.compData.patient_id;
    this.compData.admission_id = this.admissionid;
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
    // this.compData.dob = this.comonService.datepipe.transform(this.compData.dob, 'dd-MM-yyyy');
    console.log('update new born' , this.compData)
  }

  SubmitClickHandler() {
    this.state.currentstate = MODE_ADD;
    console.log('compdata' , this.compData)
    this.submitClickHandler();
  }

  // submitClickHandler() {
  //   if (this.state.currentstate === MODE_ADD) {
  //     this.updateNewBornModel(this.compData);
  //     // this.hmisApi.setNewBorn(this.compData);
  //   } else {

  //     this.hmisApi.setNewBornAsPerId(this.compData.ID, this.compData);
  //   }
  // }




  invokeEditFunction(){
    console.log("fire edit mode    ", this.compData);
    //this.hmisApi.setNewBornAsPerId(this.compData.ID,this.compData);
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }

  private onKeyUpSearchForPatient(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getPatientListForNewbornWithAdmissionSequence(evntObj.data);
    }
  }

  private createPatientlistForNewborn(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
    console.log('patient list ', this.patientList)
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.hmisApi.getPatientDetailsForNewbornOnSearchId(evntObj.data.id);
    this.admissionid = evntObj.data.id
  }
  showage;
  showdatewithtime(){
    console.log('date' , this.showage)
  }
  valueChangeHandler(e){
console.log('eeee' , e)
  }
}
