import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { Ward, FloorOptions, WardType } from '../../models/opd';
import { RESULT_TYPE_SET_WARD, RL_WARD_TYPE_LIST, MODE_ADD, RESULT_TYPE_GET_FLOOR, RESULT_TYPE_SET_WARD_TYPE, RESULT_TYPE_EDIT_WARD_TYPE } from '../../models/common';

@Component({
  selector: 'app-ward-type',
  templateUrl: './ward-type.component.html',
  styleUrls: ['./ward-type.component.scss']
})

export class WardTypeComponent extends BaseComponent implements OnInit {

  private _tempData: Ward;
  private floorOptions: Array<FloorOptions>;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getFloor();
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_FLOOR) {
      this.floorOptions = this.comonService.floorOption(data.result);
    }
    if (data.resulttype === RESULT_TYPE_SET_WARD_TYPE) {
      this.compLoadManager.redirect(RL_WARD_TYPE_LIST);
      this.hmisApi.getWardTypeSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_WARD_TYPE) {
      this.compLoadManager.redirect(RL_WARD_TYPE_LIST);
      this.hmisApi.getWardTypeSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new WardType();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setWardType(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setWardTypeAsPerId(this.compData.ID, this.compData);
  }
}
