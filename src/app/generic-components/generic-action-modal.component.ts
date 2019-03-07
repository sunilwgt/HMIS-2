import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../utils/base.component';
import { State } from '../models/state';
import { BaseServices } from '../utils/base.service';
import { DELETE_CONFIRMATION_ID_STATE, DELETE, MODE_DELETE, ActionType, ACTION_BUTTON_STATE } from '../models/common';
import { GenericActionComponent } from './generic-action/generic-action.component';


@Component({
    selector: 'generic-action-modal',
    template: `
    <div>
      <Label>Do you want to delete</Label>
      <button class="opd-button btn btn-info" (click)="executeDelete()">OK</button><button class="ipd-button btn btn-info" (click)="cancelDelete()">Cancel</button>
    </div>
    `
})

export class GenericActionModal extends GenericActionComponent implements OnInit {

    constructor(private baseservices: BaseServices) {
        super(baseservices)
    }

    ngOnInit() {
        //this._stateObj = this.stateService.createState(ACTION_BUTTON_STATE);
    }

    private executeDelete() {
        //this.baseservices.comonService.deleteHandler.emit(this.state);

    }

    private cancelDelete() {
        this.baseservices.compLoadManager.closePopup();
    }
}