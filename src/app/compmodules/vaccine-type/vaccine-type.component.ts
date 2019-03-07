import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { VaccineType } from '../../models/opd';
import { MODE_ADD, RESULT_TYPE_SET_VACCINE_TYPE, RL_VACCINE_TYPE_LIST, RESULT_TYPE_EDIT_VACCINE_TYPE } from '../../models/common';

@Component({
  selector: 'app-vaccine-type',
  templateUrl: './vaccine-type.component.html',
  styleUrls: ['./vaccine-type.component.scss']
})
export class VaccineTypeComponent extends BaseComponent implements OnInit {

  private _tempData: VaccineType;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_VACCINE_TYPE) {
      this.compLoadManager.redirect(RL_VACCINE_TYPE_LIST);
      this.hmisApi.getVaccineTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_VACCINE_TYPE) {
      this.compLoadManager.redirect(RL_VACCINE_TYPE_LIST);
      this.hmisApi.getVaccineTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new VaccineType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setVaccineType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setVaccineTypeAsPerId(this.compData.ID, this.compData);
  }
}
