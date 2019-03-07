import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { CompLoadManagerService, POPUP, CLOSE_POPUP } from '../utils/computils/comp-load-manager.service';
import { StateService } from '../services/state.service';
import { ComponentInfo } from '../models/compinfo';
import { GenericPopupOption, MODE_STATE, ACTION_BUTTON_STATE } from '../models/common';

@Component({
  selector: 'generic-context',
  template: `
      <style>
        .inputWidth{
          width:100%;
        }
      </style>
      <div class="modal-header">
        <h4 class="modal-title">{{mode}}{{compinfo.headerTitle || compinfo.compName}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="checkStateAndClose()" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ng-template [hmisCompMap]="compinfo"></ng-template>
      </div>

      <!--div class="modal-footer">
        <button type="button" class="btn btn-outline-dark"
        (click)="checkStateAndClose()">Close</button>
      </div-->
  `
})
export class GenericModalContent implements OnDestroy {
  @Input() compinfo: ComponentInfo;
  @Input() set closed(value:boolean){
    if(value){
      this.activeModal.close();
    }
  }

  private _subscription: Subscription;
  private _stateSubscription: Subscription;
  private mode: string;

  constructor(private activeModal: NgbActiveModal,
    private _compLoadManager: CompLoadManagerService,
    private _state: StateService) {
    this._subscription = this._compLoadManager.dataObserver.subscribe(data => {
      if (data.type === CLOSE_POPUP) {
        this.checkStateAndClose();
      }
    });

    this._stateSubscription = this._state.stateObserver.subscribe(data => {
      if (data && data.stateID === ACTION_BUTTON_STATE) {
        this.mode = data.currentstate + " ";
      }
    })


  }

  private checkStateAndClose(): void {
    this._state.currentstate = null;
    this.activeModal.close();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._stateSubscription.unsubscribe();
  }
}


@Component({
  selector: 'generic-popup',
  template: ``
})
export class GenericPopup implements OnInit, OnDestroy {
  @Input() modalOption: NgbModalOptions;

  private _subscription: Subscription;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal,
    private _compManager: CompLoadManagerService) {
    this._subscription = this._compManager.dataObserver.subscribe(data => {
      if (data.type === POPUP) {
        this.open(data.value.compInfo);
      }
    });

  }

  ngOnInit() {

  }

  private open(compinfo: ComponentInfo): void {
    if (!this.modalOption) {
      this.modalOption = new GenericPopupOption();
      this.modalOption.size = "lg";
    }
    this.modalRef = this.modalService.open(GenericModalContent, { size: this.modalOption.size });
    this.modalRef.componentInstance.compinfo = compinfo;
  }

  public openPopup(compinfo: ComponentInfo): void {
    this.open(compinfo);
  }

  public closePopup():void{
   this.modalRef.componentInstance.closed = true;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
