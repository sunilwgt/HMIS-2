import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { State } from '../../models/state';
import { BaseServices } from '../../utils/base.service';
import { MODAL_ITEM_CLICKED_STATE } from '../../models/common';
@Component({
  selector: 'bed-item',
  template: `
    <div (click)="itemClickHandler()" class="bed_nom"><Label>{{data.label}}</Label></div>
  `,
  styleUrls: ['./bed-popup.component.scss']
})

export class BedModalItem implements OnInit {
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
    this._stateObj.instanceID = "admissionBed";
    this.baseService.stateService.updateState(this._stateObj);
  }

}
