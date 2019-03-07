import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { StateService } from '../services/state.service';
import { APP_SESSION_STATE } from '../models/common';
import { State } from '../models/state';

@Directive({
    selector: '[sessionCheck]'

})
export class SessionCheckDirective {

  private _stateObj:State;

  constructor(private _stateService:StateService) {
    this._stateObj = this._stateService.createState(APP_SESSION_STATE);                                         
    // console.log('mouse state' , this._stateObj);

  }

  @HostListener('document:keydown', ['$event']) public onKeyDown(event){
    this._stateObj.currentstate = "onKeyDown";
    this._stateService.updateState(this._stateObj);
    // console.log('mouse state' , this._stateObj);

  }

  @HostListener('document:mousemove', ['$event']) public onMouseMove(event){
    this._stateObj.currentstate = "onMouseMove";
    this._stateService.updateState(this._stateObj);
    // console.log('mouse state' , this._stateObj);

  }



}
