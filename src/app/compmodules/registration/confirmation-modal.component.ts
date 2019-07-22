import { Component, OnInit } from '@angular/core';
import { CompLoadManagerService } from '../../utils/computils/comp-load-manager.service';
import { RL_ADMISSION, PATIENT_ID_STATE, RL_PRESCRIPTION_LIST, RL_REGISTRATION_LIST } from '../../models/common';
import { BaseServices } from '../../utils/base.service';
import { Subscription } from 'rxjs/Subscription';
import { State } from '../../models/state';

@Component({
  selector: 'confirmation-modal',
  template: `
  <div>
  
    <div class="row">
    <div class=" offset-md-1 col-md-12">
    <Label>Your registration id {{regId}}</Label><br>
    </div>
    </div>
    <div class="row">
    <div class=" offset-md-1 col-md-12">
    <button class="opd-button btn btn-info" (click)="openPrescriptionModal()">OPD</button><button class="ipd-button btn btn-info" (click)="openAdmissionModal()">IPD</button>
    </div>
    </div>
  </div>
  `,
  // styles: ['.confirmation { align-items: center !important; display: flex !important; }']
})
export class ConfirmationModal implements OnInit {

  private _state: State;
  private _stateSubscription: Subscription;
  private regId: string;

  constructor(private baseservice: BaseServices) {
    this._stateSubscription = this.baseservice.stateService.stateObserver.subscribe(data => {
      if (data && data.stateID === PATIENT_ID_STATE) {
        this.regId = data.stateData;
      }
    })
  }

  ngOnInit() {
  }

  private openAdmissionModal(): void {
    this.baseservice.compLoadManager.closePopup();
    this.baseservice.compLoadManager.redirect(RL_ADMISSION);
  }

  private openPrescriptionModal(): void {
    this.baseservice.compLoadManager.closePopup();
    // this.baseservice.compLoadManager.redirect(RL_PRESCRIPTION_LIST);
    this.baseservice.compLoadManager.redirect(RL_REGISTRATION_LIST);

  }
}
