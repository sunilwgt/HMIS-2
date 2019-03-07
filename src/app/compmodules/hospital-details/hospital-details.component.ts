import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { MODE_ADD, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, HOSPITAL_MODE_STATE, MODE_EDIT, RESULT_TYPE_SET_HOSPITAL_DETAIL, UPDATE_FIELD_DATA_STATE, GenericPopupOption, RL_SAVE_MESSAGE_MODAL, RESULT_TYPE_EDIT_HOSPITAL_DETAIL, RESULT_ERROR } from '../../models/common';
import { HospitaDetail } from '../../models/hospitadetail';
import { State,RegisterState } from '../../models/state';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GenericPopup } from '../../generic-components/generic-popup';
import { ComponentModule } from '../../enums/component-module.enum';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalDetailsComponent extends BaseComponent implements OnInit {

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;

  private stateObj: State;
  private updateDataState: State;
  private modaloption: NgbModalOptions;
  //private compData:any;

  constructor(baseService: BaseServices) {
    super(baseService);
    //this.state = this.stateService.createState();
    this.hmisApi.getHospitalSettings("");
    this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
    this.updateDataState = this.stateService.createState(UPDATE_FIELD_DATA_STATE);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {

        this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
        this.compData = data.result[0];
        this.stateObj.currentstate = MODE_EDIT;
       
       if(this.state === undefined){
         this.state = this.stateObj;
       } 
        this.state.stateData = (this.compData === undefined ? this.state.stateData: this.compData);
        setTimeout(() => {
          super.updateBtnState(this.stateObj);
          this.stateService.updateState(this.updateDataState);
          this.compData = this.state.stateData;
        }, 600);
        this.updateDataForEVMode();
      }

    if(data.resulttype === RESULT_ERROR){
      if(this.stateObj === undefined || this.stateObj.currentstate === undefined){
        this.stateObj = this.stateService.createState(HOSPITAL_MODE_STATE);
        this.stateObj.currentstate = MODE_ADD;
      }
      this.compData = new HospitaDetail();
    }

     if (data.resulttype === RESULT_TYPE_SET_HOSPITAL_DETAIL || data.resulttype === RESULT_TYPE_EDIT_HOSPITAL_DETAIL) {
      this.hmisApi.getHospitalSettings("");
    }

  }

  ngOnInit() { }

  invokeAddFunction(): void {
    this.stateObj.stateData = this.compData;
    if (this.stateObj.currentstate === MODE_ADD) {
      this.hmisApi.setHospitalSettings(this.compData);
    } else {
      this.hmisApi.setHospitalDetailAsPerId(this.compData.ID, this.compData);
    }
  }

}
