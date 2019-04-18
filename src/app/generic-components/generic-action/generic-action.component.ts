import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { StateService } from '../../services/state.service';
import { HmisApisService } from '../../services/hmis-apis.service';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';

import { ActionType, MODE_VIEW, MODE_EDIT, MODE_DELETE, MODE_OTHERS, OTHERS, DELETE, VIEW, EDIT, ACTION_BUTTON_STATE, RL_DELETE_CONFIRMATION_MODAL, GenericPopupOption, MODE_DISCHARGE, MODE_OT, MODE_DISCHARGE_BED, MODE_ADD, ADD, MODE_ADMISSION, MODE_EMERGENCY } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { State } from '../../models/state';
import { GenericPopup } from '../generic-popup';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hmis-generic-action',
  templateUrl: './generic-action.component.html',
  styleUrls: ['./generic-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericActionComponent extends BaseComponent implements OnInit {
  @Input() actiontypeId: string | number;
  @Input() itemdata: any;
  @Input() deleteDisable: boolean = true;
  @Input() printDisable: boolean = true;
  @Input() dischargeDisable: boolean = true;
  @Input() oTDisable: boolean = true;
  @Input() admissionDisable: boolean = true;
  @Input() isadmitted: boolean = true;
  @Input() isadmittedstyle: boolean = true;
  @Input() isdischargedstyle: boolean = true;
  @Input() isotstyle: boolean = true;
  @Input() DischargeBedDisable: boolean = true;
  @Input() emergencyDisable: boolean = true;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  @Output() getdoctornameinsearch: EventEmitter<any> = new EventEmitter();

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;
  private modaloption: NgbModalOptions;
  public _stateObj: State;
  public items: any;


  constructor(private baseServices: BaseServices) {
    super(baseServices);
  }

  ngOnInit() {
    this.modaloption = new GenericPopupOption();
    this.modaloption.size = "sm";
    this._stateObj = this.baseServices.stateService.createState(ACTION_BUTTON_STATE);
  }

  private clickEditHandler(): void {
    this._stateObj.currentstate = EDIT;
    this.updateState(this._stateObj);

    this.state.currentstate = MODE_EDIT;
    this.state.stateData = this.itemdata;
    this.getdoctornameinsearch.emit({ doctor_name: this.state.stateData.doctor_name });
    //console.log('ddddddddddddddd', this.state.stateData.doctor_name);
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_EDIT });

    /**
     *  For reference purpose.
     */
    // let stateObj:State = this.baseServices.stateService.createState("TEST");
    // stateObj.currentstate = "ADD_Patient";
    // this.updateState(stateObj);
  }

  private clickViewHandler(): void {
    this._stateObj.currentstate = VIEW;
    this.updateState(this._stateObj);

    this.state.currentstate = MODE_VIEW;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_VIEW });
  }

  public clickDeleteHandler(): void {
    // this.state.currentstate = DELETE;
    // this.genericPopup.openPopup(this.compLoadManager.redirect(RL_DELETE_CONFIRMATION_MODAL, true));
    // this.baseServices.comonService.deleteHandler.subscribe((data) => {
    this._stateObj.currentstate = DELETE;
    this.updateState(this._stateObj);

    this.state.currentstate = MODE_DELETE;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_DELETE });
    // });
  }

  private clickOtherHandler(): void {
    this._stateObj.currentstate = OTHERS;
    this.updateState(this._stateObj);

    this.state.currentstate = MODE_OTHERS;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{
      data: this.itemdata,
      mode: MODE_OTHERS, atypeId: this.actiontypeId
    });
  }

  private clickDischargeHandler(): void {
    this._stateObj.currentstate = ADD;
    this.updateState(this._stateObj);
    this.state.currentstate = MODE_ADD;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_ADD });
  }

  private clickOTHandler(): void {
    this._stateObj.currentstate = MODE_OT;
    this.state.currentstate = MODE_OT;
    this.updateState = this.itemdata;
    this.clickHandler.emit(<ActionType>{
      data: this.itemdata,
      mode: MODE_OT,
      atypeId: this.actiontypeId
    })
  }

  private clickDischargeBedHandler(): void {
    this._stateObj.currentstate = MODE_DISCHARGE_BED;
    this.updateState(this._stateObj);
    this.state.currentstate = MODE_DISCHARGE_BED;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_DISCHARGE_BED });
  }

  private clickAdmissionHandler(): void {
    this._stateObj.currentstate = MODE_ADMISSION;
    this.updateState(this._stateObj);
    this.state.currentstate = MODE_ADMISSION;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_ADMISSION });
  }

  private clickEmergencyHandler(): void {
    this._stateObj.currentstate = MODE_EMERGENCY;
    this.updateState(this._stateObj);
    this.state.currentstate = MODE_EMERGENCY;
    this.state.stateData = this.itemdata;
    this.clickHandler.emit(<ActionType>{ data: this.itemdata, mode: MODE_EMERGENCY });
  }
}
