import { Component, OnInit, } from '@angular/core';
import { WardOptions } from '../../../models/opd';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { RESULT_TYPE_GET_WARD, RESULT_TYPE_GET_WARD_BY_FLOOR, Option, RESULT_TYPE_GET_WARD_DROPDOWN } from '../../../models/common';

@Component({
  selector: 'hmis-ward-type-popup',
  templateUrl: './ward-type-popup.component.html',
  styleUrls: ['./ward-type-popup.component.scss']
})

export class WardTypeModal extends BaseComponent implements OnInit {

  private wardOptions: Array<WardOptions>;
  private noDataOptions: Array<Option>;

  constructor(baseService: BaseServices) {
    super(baseService);
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_WARD_DROPDOWN) {
      this.wardOptions = this.comonService.wardOption(data.result);
    }
  }

  ngOnInit() {
    if (this.comonService.selectedFloor) {
      //this.hmisApi.getWardByFloor(this.comonService.selectedFloor);
      this.hmisApi.getWardDropdown(this.comonService.selectedFloor);
    }
  }


}
