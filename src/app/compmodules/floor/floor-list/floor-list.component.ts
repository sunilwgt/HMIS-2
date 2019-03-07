import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_FLOOR, RESULT_TYPE_GET_FLOOR, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_FLOOR, RESULT_TYPE_GET_FLOOR_LIST } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { State } from '../../../models/state';


@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent extends BaseComponent implements OnInit {

  private floor = [];
  private floorResource = new DataTableResource([]);
  private floorCount = 0;

  constructor(baseService: BaseServices) {
    super(baseService);
    this.hmisApi.getFloorSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype == RESULT_TYPE_GET_FLOOR_LIST) {
      this.floor = data.result;
      this.floorResource = new DataTableResource(this.floor);
      this.floorResource.count().then(count => {
        this.floorCount = count;
      });
    }
    if (data.resulttype == RESULT_TYPE_DELETE_FLOOR) {
      this.hmisApi.getFloorSearch("");
    }
  }


  reloadFloor(params) {
    this.floorResource.query(params).then(ftypes => this.floor = ftypes);

  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };


  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_FLOOR);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_FLOOR);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteFloor(eventObj.data.ID);
        break;
    }

  }

  private addFloor(): void {
    this.openCompInAddMode(RL_FLOOR);
  }


  ngOnInit() {
    //console.log(films);
  }
}
