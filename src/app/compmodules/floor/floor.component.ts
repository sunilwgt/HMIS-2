import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { Floor, FloorOptions, BuildingOptions } from '../../models/opd';
import { Subscription } from 'rxjs';
import { RESULT_TYPE_GET_BUILDING, RESULT_TYPE_SET_FLOOR, RL_FLOOR_LIST, MODE_EDIT, MODE_VIEW, MODE_ADD, RESULT_TYPE_EDIT_FLOOR, RESULT_TYPE_GET_BUILDING_DROPDOWN } from '../../models/common';


@Component({
  selector: 'hmis-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent extends BaseComponent implements OnInit {

  private _tempData: Floor;
  private buildingOptions: Array<BuildingOptions> = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBuildingDropdown();
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BUILDING_DROPDOWN) {
      this.buildingOptions = this.comonService.buildingOption(data.result);
    }

    if (data.resulttype === RESULT_TYPE_SET_FLOOR) {
      this.compLoadManager.redirect(RL_FLOOR_LIST);
      this.hmisApi.getFloorSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_FLOOR) {
      this.compLoadManager.redirect(RL_FLOOR_LIST);
      this.hmisApi.getFloorSearch("");
      this.compLoadManager.closePopup();
    }
  }


  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Floor();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setFloor(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setFloorAsPerId(this.compData.ID, this.compData);
  }
}
