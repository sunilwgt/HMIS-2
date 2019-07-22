import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Subscription } from 'rxjs/Subscription';
import { Approverr } from '../../models/opd';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, RESULT_TYPE_SET_BUILDING, RL_BUILDING_LIST, RESULT_TYPE_EDIT_BUILDING_LIST, RESULT_TYPE_GET_APPROVER_SELECT, RESULT_TYPE_SET_APPROVER, RESULT_TYPE_GET_ALL_USERS, RL_APPROVER_LIST, RESULT_TYPE_SET_APPROVER_AS_ID } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApproverComponent extends BaseComponent implements OnInit {

  // private _tempData: Building;
  private approver = [];
  private approveOption = [];
  private ApproverModel: Approverr = new Approverr;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = false;
    this.hmisApi.getapproverSelect("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_APPROVER) {
      this.compLoadManager.redirect(RL_APPROVER_LIST);
      this.hmisApi.getapproverSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_BUILDING_LIST) {
      this.compLoadManager.redirect(RL_BUILDING_LIST);
      this.hmisApi.getBuildingSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_GET_APPROVER_SELECT) {
      this.approveOption = this.comonService.approveOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_SET_APPROVER_AS_ID) {
      this.compLoadManager.redirect(RL_APPROVER_LIST);
      this.hmisApi.getapproverSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Approverr();
    }
  }

  invokeAddFunction(): void {
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
    this.compData.s_delegate = false;
    this.compData.delegate_id = null;
    this.hmisApi.createapprover(this.compData);
  }

  invokeEditFunction(): void {
    this.ApproverModel.approver_id = this.compData.approver_id;
    this.ApproverModel.approver_type = this.compData.approver_type;
    this.ApproverModel.created_by = this.hmisApi.userDetail.created_by;
    this.ApproverModel.modified_by = this.hmisApi.userDetail.modified_by;
    this.ApproverModel.delegate_id = this.compData.delegate_id;
    this.ApproverModel.is_delegate = true;
    this.ApproverModel.status = this.compData.status;
    this.hmisApi.setApproverAsPerId(this.ApproverModel);
  }

}
