import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { Ward, FloorOptions, WardOptions, wardTypeOptions,BuildingOptions } from '../../models/opd';
import { MODE_ADD, RESULT_TYPE_GET_FLOOR, RESULT_TYPE_SET_WARD, RL_WARD_LIST, RESULT_TYPE_EDIT_WARD,RESULT_TYPE_GET_WARD_TYPE,RESULT_TYPE_GET_WARD_TYPE_LIST,RESULT_TYPE_GET_FLOOR_LIST,RESULT_TYPE_GET_BUILDING_DROPDOWN,RESULT_TYPE_GET_FLOOR_DROPDOWN, MODE_EDIT } from '../../models/common';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss']
})
export class WardComponent extends BaseComponent implements OnInit {
  private floorOptions: Array<FloorOptions>;
  private buildingOption:Array<BuildingOptions>;
  private wardType:any=[];
  private wardOptions: Array<wardTypeOptions> = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBuildingDropdown();
    this.defaultvalidation = false;
    this.hmisApi.getWardTypeSearch("");
    
  }

  hmisApiSubscribe(data: any): void {
    if(data.resulttype === RESULT_TYPE_GET_WARD_TYPE_LIST){
      this.wardOptions = this.comonService.wardTypeOption(data.result)
    }
    if (data.resulttype === RESULT_TYPE_GET_FLOOR_LIST) {
    }
    if (data.resulttype === RESULT_TYPE_SET_WARD) {
      this.compLoadManager.redirect(RL_WARD_LIST);
      this.hmisApi.getWardSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_WARD) {
      this.compLoadManager.redirect(RL_WARD_LIST);
      this.hmisApi.getWardSearch("");
      this.compLoadManager.closePopup();
    }
    if(data.resulttype === RESULT_TYPE_GET_BUILDING_DROPDOWN){
      this.buildingOption = this.comonService.buildingOption(data.result);
    }
    if(data.resulttype === RESULT_TYPE_GET_FLOOR_DROPDOWN){
      this.floorOptions = this.comonService.floorOption(data.result);
    }
  }

  private getselectedItem(event){
     this.hmisApi.getFloorDropdown(event.newval);
     this.compData["building_id"] = event.newval;
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Ward();
    }
    if(this.state.currentstate === MODE_EDIT){
      this.hmisApi.getFloorDropdown(this.compData.building_id);
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setWard(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setWardAsPerId(this.compData.ID, this.compData);
  }

}
