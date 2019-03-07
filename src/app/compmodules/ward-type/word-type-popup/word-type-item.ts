import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BaseServices } from '../../../utils/base.service';
import { MODAL_ITEM_CLICKED_STATE } from '../../../models/common';
import { State } from '../../../models/state';

@Component({
  selector: 'ward-type-item',
  template: `
    <div (click)="itemClickHandler()"><Label>{{data.label}}</Label></div>
  `,
})

export class WardTypeModalItem implements OnInit {
  @Input() data:any;

  private _stateObj:State;

  constructor(private baseService: BaseServices) {
  }



  ngOnInit() {
    this._stateObj = this.baseService.stateService.createState(MODAL_ITEM_CLICKED_STATE);
  }

  private itemClickHandler():void{
    this._stateObj.currentstate = "itemClicked";
    this._stateObj.stateData = this.data;
    this._stateObj.instanceID = "admissionWard";
    this.baseService.stateService.updateState(this._stateObj);
  }

}
