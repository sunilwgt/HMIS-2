import { Component, OnInit, ViewEncapsulation, Output  ,EventEmitter} from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Subscription } from 'rxjs/Subscription';
import { Building } from '../../models/opd';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, RESULT_TYPE_SET_BUILDING, RL_BUILDING_LIST, RESULT_TYPE_EDIT_BUILDING_LIST, ACTION_BUTTON_STATE } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuildingComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State
  private _tempData: Building;

  constructor(private baseService: BaseServices) {
    super(baseService);
    this.defaultvalidation = false;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_BUILDING) {
      this.compLoadManager.redirect(RL_BUILDING_LIST);
      this.hmisApi.getBuildingSearch("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_BUILDING_LIST) {
      this.compLoadManager.redirect(RL_BUILDING_LIST);
      this.hmisApi.getBuildingSearch("");
      this.compLoadManager.closePopup();
    }
  }

  ngOnInit() {
    

 
this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.compData = new Building();
    }
  }

  invokeAddFunction(): void {
    this.hmisApi.setBuilding(this.compData);
  }

  invokeEditFunction(): void {
    this.hmisApi.setBuildingAsPerId(this.compData.ID, this.compData);
  }

}
