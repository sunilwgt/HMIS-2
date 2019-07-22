import { Component, OnInit, Output  , EventEmitter} from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_FLOOR, RESULT_TYPE_GET_FLOOR, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RESULT_TYPE_DELETE_FLOOR, RESULT_TYPE_GET_FLOOR_LIST, DELETE, VIEW, EDIT, ACTION_BUTTON_STATE } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { State } from '../../../models/state';


@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent extends BaseComponent implements OnInit {

  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private floor = [];
  private floorResource = new DataTableResource([]);
  private floorCount = 0;

  constructor(private baseService: BaseServices) {
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


  // private clickEventHandler(eventObj: ActionType): void {
  //   switch (eventObj.mode) {
  //     case MODE_EDIT:
  //       this.compLoadManager.redirect(RL_FLOOR);
  //       break;

  //     case MODE_VIEW:
  //       this.compLoadManager.redirect(RL_FLOOR);
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteFloor(eventObj.data.ID);
  //       break;
  //   }

  // }


  
 private clickEventHandler(eventObj: ActionType, mode, item): void {
  console.log('eventObj', eventObj, mode, item);
  switch (mode) {
    case MODE_EDIT:
      this._stateObj.currentstate = EDIT;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_EDIT;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
      this.compLoadManager.redirect(RL_FLOOR);
      break;

    case MODE_VIEW:
      this._stateObj.currentstate = VIEW;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_VIEW;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
      this.compLoadManager.redirect(RL_FLOOR);
      break;

    case MODE_DELETE:
      this._stateObj.currentstate = DELETE;
      this.updateState(this._stateObj);
      this.state.currentstate = MODE_DELETE;
      this.state.stateData = item;
      this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
      this.hmisApi.deleteFloor(item.ID);
      break;
  }
}


  private addFloor(): void {
    this.openCompInAddMode(RL_FLOOR);
  }


  ngOnInit() {
    

this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);



    //console.log(films);
  }
}
