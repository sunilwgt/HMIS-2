import { Component, OnInit } from '@angular/core';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { RL_ADMISSION, RL_PRESCRIPTION_LIST, PATIENT_ADMISSION_ID_STATE, RL_ADMISSION_LIST, ADMISSION_MODAL_ID_STATE } from '../../models/common';
import { BaseServices } from '../../utils/base.service';
import { Subscription } from 'rxjs/Subscription';
import { State } from '../../models/state';
import { BaseComponent } from '../../utils/base.component';

@Component({
    selector: 'admission-confirmation-modal',
    template: `
  <div>
    <Label>Thank you for your admission</Label>
    <button class="opd-button btn btn-info" (click)="closeModal()">OK</button>
  </div>
  `
})
export class AdmissionConfirmationModal implements OnInit {

    private _state: State;
    private _stateSubscription: Subscription;
    private admissionId: string;
    private _modalStateObj: State;

    constructor(private baseservice: BaseServices) {
        this._stateSubscription = this.baseservice.stateService.stateObserver.subscribe(data => {
            if (data && data.stateID === PATIENT_ADMISSION_ID_STATE) {
                this.admissionId = data.stateData;
            }
        })
    }

    ngOnInit() {
        this._modalStateObj = this.baseservice.stateService.createState(ADMISSION_MODAL_ID_STATE);
    }

    private closeModal(): void {
        // this._modalStateObj.currentstate = ADMISSION_MODAL_ID_STATE;
        // this._modalStateObj.stateData = this.admissionId;
        // this.baseservice.stateService.updateState(this._modalStateObj);

        this.baseservice.compLoadManager.closePopup();
        this.baseservice.compLoadManager.redirect(RL_ADMISSION_LIST);
    }

    // private openAdmissionModal(): void {
    //     this.baseservice.compLoadManager.closePopup();
    //     this.baseservice.compLoadManager.redirect(RL_ADMISSION);

    // }
}
