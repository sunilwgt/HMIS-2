import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NewBorn, DeliveryType, deliveryTypeOptions } from '../../models/opd';
import {UPDATE_FIELD_STATE, RESULT_TYPE_SET_NEW_BORN, RL_NEW_BORN_LIST, MODE_EDIT, MODE_VIEW, RESULT_TYPE_EDIT_NEW_BORN, RESULT_TYPE_DELETE_NEW_BORN, RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN}from '../../models/common';
import { MODE_ADD, RadioData } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';

@Component({
  selector: 'app-new-born',
  templateUrl: './new-born.component.html',
  styleUrls: ['./new-born.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewBornComponent extends BaseComponent implements OnInit {

  private genderOptions: Array<RadioData>;
  private bplOption: Array<RadioData>;
  private _updateStateObj:State;
  private deliveryTypeOption:Array<deliveryTypeOptions> = [];

  showNav: any = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    this.showNav[0] = true;
    this.hmisApi.getDeliveryTypeDropdown();
  }

  hmisApiSubscribe(data: any): void {
    if(data.resulttype === RESULT_TYPE_GET_DELIVERY_TYPE_DROPDOWN){
       this.deliveryTypeOption = this.comonService.deliveryTypeListOption(data.result);
    }
    if (data.resulttype === RESULT_TYPE_SET_NEW_BORN) {
      this.hmisApi.getNewBornSearch("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_NEW_BORN_LIST);
    }
    if(data.resulttype === RESULT_TYPE_EDIT_NEW_BORN){
      this.hmisApi.getNewBornSearch("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_NEW_BORN_LIST);
    }
    
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new NewBorn();
    }
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.bplOption = this.comonService.radioYesNoOptions;
    this.genderOptions = this.comonService.genderOptions;

    if (this.state.currentstate === MODE_EDIT || this.state.currentstate === MODE_VIEW) {}
    this.updateAllFields();
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
    this.updateAllFields();
  }

 private updateNewBornModel(data: any){
  this.compData.admission_id = "0be9deca-1662-4ac3-b5dc-0a2d5ec4917f";
  this.compData.patient_id = "a49e643b-c14d-42f6-9633-4d4d18b009e7";
  this.compData.created_by = this.hmisApi.userDetail.created_by;
  this.compData.modified_by = this.hmisApi.userDetail.modified_by;
  this.compData.dob = this.comonService.datepipe.transform(this.compData.dob,'dd-MM-yyyy');
 }
  submitClickHandler(){
    if(this.state.currentstate === MODE_ADD){
      this.updateNewBornModel(this.compData);
      this.hmisApi.setNewBorn(this.compData);
    }else{
     
      this.hmisApi.setNewBornAsPerId(this.compData.ID,this.compData);
    }
  }
  // invokeEditFunction(){
  //   console.log("fire edit mode    ", this.compData);
  //   //this.hmisApi.setNewBornAsPerId(this.compData.ID,this.compData);
  // }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }

}
