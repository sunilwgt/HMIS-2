import { OnDestroy } from "@angular/core";
import { BaseServices } from "./base.service";
import { HmisApisService } from "../services/hmis-apis.service";
import { StateService } from "../services/state.service";
import { CommonService } from "../services/common.service";
import { CompLoadManagerService } from "./computils/comp-load-manager.service";
import { State, RegisterState } from "../models/state";
import { MODE_STATE, MODE_EDIT, MODE_VIEW, MODE_ADD, ACTION_BUTTON_STATE, ADD, EDIT, MODE_OTHERS, VALIDATE_FIELD_STATE, VALID_FIELD, ADMISSION_MODAL_ID_STATE, DISCHARGE } from "../models/common";
import { CompDataInfo } from "../models/registration";
import { GenericCompType } from "../enums/generic-comp-type.enum";
import { Subscription } from 'rxjs/Subscription';



export class BaseComponent implements OnDestroy {
  hmisApi: HmisApisService;
  comonService: CommonService;
  stateService: StateService;
  compLoadManager: CompLoadManagerService;

  protected state: State;
  protected compData: any;
  protected showSubmitBtn: boolean = true;
  protected submitBtnLabel: string = "Add";
  protected gencomp: any = GenericCompType;
  protected defaultvalidation: boolean = false;

  private _sObj: State;
  private _validateSObj: State;
  private _hmisApiSubscription: Subscription;
  private _stateSubscription: Subscription;
  private _compLMSubscription: Subscription;
  private _isFieldsDirty: boolean = false;

  constructor(baseservice: BaseServices) {
    this.hmisApi = baseservice.hmisApi;
    this.comonService = baseservice.comonService;
    this.stateService = baseservice.stateService;
    this.compLoadManager = baseservice.compLoadManager;

    // Clear field state.
    this.stateService.clearRegisterStateAsPerId(VALIDATE_FIELD_STATE);

    // add subscription.
    this._hmisApiSubscription = this.hmisApi.apiResults.subscribe(data => {
      this.hmisApiSubscribe(data);

    });

    this._stateSubscription = this.stateService.stateObserver.subscribe(data => {
      this.stateSubscribe(data);
    });

    this._compLMSubscription = this.compLoadManager.dataObserver.subscribe(data => {
      this.cLManagerSubscribe(data);

    });



    this.state = this.stateService.createState(MODE_STATE);
    this._sObj = this.stateService.createState(ACTION_BUTTON_STATE);
    this._validateSObj = this.stateService.createState(VALIDATE_FIELD_STATE);
  }

  protected hmisApiSubscribe(data: any): void {

  }

  protected stateSubscribe(data: any): void {

  }

  protected cLManagerSubscribe(data: any): void {

  }

  protected updateState(stateobj: State): void {
    this.stateService.updateState(stateobj);
  }

  protected updateDataForEVMode(): void {
    if (this.state.currentstate === MODE_EDIT || this.state.currentstate === MODE_VIEW) {
      this.compData = this.state.stateData;
    } else {
      this.initialState();
    }
    this.changeSubmitBtnProp(this.state.currentstate);
  }

  protected openCompInAddMode(routerlink: string): void {
    this.state.currentstate = MODE_ADD;
    this.compLoadManager.redirect(routerlink);

    this._sObj.currentstate = ADD;
    this.stateService.updateState(this._sObj);
  }

  protected updateUserDetailData(): void {
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
  }

  protected valueChangeHandler(evt: CompDataInfo): void {
    this.compData[evt.propname] = evt.newval;
    console.log('this.compdata' , this.compData);
  }

  protected submitClickHandler(): void {
    if (this.validateSubmitHandler()) {
      switch (this.state.currentstate) {
        case MODE_ADD:
          this.invokeAddFunction();
          break;
        case MODE_EDIT:
          this.invokeEditFunction();
          break;
        case MODE_OTHERS:
          this.invokeOtherFunction();
          break;
      }
    }
  }

  protected invokeAddFunction(): void {
  }

  protected invokeEditFunction(): void {
  }

  protected invokeOtherFunction(): void {
  }

  protected validateSubmitHandler(): boolean {
    if (!this.defaultvalidation) {
      let registerState: RegisterState = this.stateService.getRegisteredStatesAsPerId(VALIDATE_FIELD_STATE);
      for (let v of registerState.states) {
        if (v.currentstate !== VALID_FIELD) {
          this.stateService.updateState(this._validateSObj);
          return false;
        }
      }
      return true;
    } else {
      if (this.compData && Object.keys(this.compData).length > 0) {
        this.updateUserDetailData();
        return true;
      }
    }

    return false;
  }

  protected updateBtnState(stateobj: State): void {
    this.changeSubmitBtnProp(stateobj.currentstate);
  }

  private changeSubmitBtnProp(btnstate: string): void {
    switch (btnstate) {
      case MODE_ADD:
        this.btnProps(true, ADD.toLocaleUpperCase());
        break;
      case MODE_VIEW:
        this.btnProps(false, "");
        break;
      case MODE_EDIT:
        this.btnProps(true, EDIT.toLocaleUpperCase());
        break;
    }
  }

  private btnProps(visible: boolean, label: string = ""): void {
    this.showSubmitBtn = visible;
    this.submitBtnLabel = label;
  }

  private initialState(): void {
    this.state.currentstate = MODE_ADD;
    this._sObj.currentstate = ADD;
    this.stateService.updateState(this._sObj);
  }

  ngOnDestroy() {
    this._hmisApiSubscription.unsubscribe();
    // console.log("ngdestroy");
    this._stateSubscription.unsubscribe();
    this._compLMSubscription.unsubscribe();
  }




}
