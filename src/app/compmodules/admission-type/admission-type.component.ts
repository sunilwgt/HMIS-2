import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { AdmissionType } from '../../models/opd';
import { RESULT_TYPE_SET_ADMISSION_TYPE, MODE_ADD, RL_ADMISSION_TYPE_List, RESULT_TYPE_EDIT_ADMISSION_TYPE } from '../../models/common';

@Component({
  selector: 'app-admission-type',
  templateUrl: './admission-type.component.html',
  styleUrls: ['./admission-type.component.scss']
})
export class AdmissionTypeComponent extends BaseComponent implements OnInit {

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_ADMISSION_TYPE) {
      this.compLoadManager.redirect(RL_ADMISSION_TYPE_List);
      this.hmisApi.getAdmissionTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_ADMISSION_TYPE) {
      this.compLoadManager.redirect(RL_ADMISSION_TYPE_List);
      this.hmisApi.getAdmissionTypeSearch("");
      this.compLoadManager.closePopup();
    }

  }


  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new AdmissionType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setAdmissionType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setAdmissionTypeAsPerId(this.compData.ID, this.compData);
  }
}
