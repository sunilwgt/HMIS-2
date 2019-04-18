import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { MODE_ADD, RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST, RESULT_TYPE_UPDATE_ADMISSION_DISCHARGE_DETAIL, RL_BILLING, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, DISCHARGE } from '../../models/common';
import { DischargeModal, DischargeTypeOption } from '../../models/opd';

@Component({
  selector: 'app-discharge-modal',
  templateUrl: './discharge-modal.component.html',
  styleUrls: ['./discharge-modal.component.scss']
})
export class DischargeModalComponent extends BaseComponent implements OnInit {

  private dischargeTypeOption: Array<DischargeTypeOption> = [];
  private DischargeModel: DischargeModal = new DischargeModal();
  private StateDataObj = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getDischargeTypeList();
    this.defaultvalidation = true;
  }

  ngOnInit() {
    this.StateDataObj = this.stateService.stateData;
    //console.log(this.StateDataObj);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new DischargeModal();
    }
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ALL_DISCHARGE_TYPE_LIST) {
      this.dischargeTypeOption = this.comonService.dischargeTypeListOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_UPDATE_ADMISSION_DISCHARGE_DETAIL) {
      if (data.result === true) {
        this.stateService.stateData = this.StateDataObj['ID'];
        this.hmisApi.getDischargePatientList(this.state.stateData.admission_sequence);
        
      }
    }
    if(data.resulttype === RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST){
      this.state.stateData = data.result[0];
      this.state.currentstate = DISCHARGE;
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_BILLING);
    }
  }

  invokeAddFunction(): void {
    this.DischargeModel.admission_id = this.StateDataObj['ID'];
    this.DischargeModel.patient_id = this.StateDataObj['patient_id'];
    this.DischargeModel.discharge_date = this.compData.discharge_date;
    this.DischargeModel.discharge_type = this.compData.discharge_type;
    this.DischargeModel.discharge_instruction = this.compData.discharge_instruction;
    this.DischargeModel.created_by = this.compData.created_by;
    this.DischargeModel.modified_by = this.compData.modified_by;
    this.hmisApi.updateDischargeDataInAdmissionDetail(this.DischargeModel);
  }

}
