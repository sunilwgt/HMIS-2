import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { RESULT_TYPE_SET_BED, RL_BED_LIST, RESULT_TYPE_EDIT_BED, MODE_ADD, RESULT_TYPE_GET_WARD,RESULT_TYPE_GET_BUILDING_DROPDOWN,RESULT_TYPE_GET_FLOOR_DROPDOWN,RESULT_TYPE_GET_WARD_DROPDOWN, MODE_EDIT } from '../../models/common';
import { Bed, WardOptions, BuildingOptions, FloorOptions } from '../../models/opd';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent extends BaseComponent implements OnInit {
  private wardOptions: Array<WardOptions> = [];
  private buildingOptions:Array<BuildingOptions> = [];
  private floorOptions:Array<FloorOptions> = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getBuildingDropdown();
    this.defaultvalidation = true;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_BED) {
      this.compLoadManager.redirect(RL_BED_LIST);
      this.hmisApi.getBedSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_BED) {
      this.compLoadManager.redirect(RL_BED_LIST);
      this.hmisApi.getBedSearch("");
      this.compLoadManager.closePopup();
    }

    if(data.resulttype === RESULT_TYPE_GET_BUILDING_DROPDOWN){
      this.buildingOptions = this.comonService.buildingOption(data.result);
    }
    if(data.resulttype === RESULT_TYPE_GET_FLOOR_DROPDOWN){
      this.floorOptions = this.comonService.floorOption(data.result);
    }

    if(data.resulttype === RESULT_TYPE_GET_WARD_DROPDOWN){
      this.wardOptions = this.comonService.wardOption(data.result);

    }

  }

  protected valueChangeHandler(event){
    if(event.propname === "bed_number"){
      this.compData["bed_number"] = event.newval;
    }
    if(event.propname === "price_per_day"){
      this.compData["price_per_day"] = event.newval;
    }if(event.propname === "description"){
      this.compData["description"] = event.newval;
    }if(event.propname === "building_id"){
      this.compData["building_id"] = event.newval;
      this.hmisApi.getFloorDropdown(event.newval);
    }if(event.propname === "floor_id"){
      this.compData["floor_id"] = event.newval;
      this.hmisApi.getWardDropdown(event.newval)
    }if(event.propname === "ward"){
      this.compData["ward"] = event.newval;
    }
    
  }
  // private valueChangeHandler(event){
  //   this.hmisApi.getWardDropdown(event.newval)
  // }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Bed();
    }
    if(this.state.currentstate === MODE_EDIT){
      this.hmisApi.getFloorDropdown(this.compData.building_id);
      this.hmisApi.getWardDropdown(this.compData.floor_id)

    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setBeds(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setBedAsPerId(this.compData.ID, this.compData);
  }

}
