import { Injectable } from '@angular/core';
import { State, RegisterState } from '../models/state';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const PATIENT_ADD: string = "patientADD";


@Injectable()
export class StateService {

  private _currentstate: string;
  private _previousstate: string;
  private _stateData: any;
  private _count: number = 0;
  private _stateList: Array<State> = [];
  private _allRegisteredState: Array<RegisterState> = [];

  private _observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  public createState(stateid: string | number = undefined): State {
    if (!stateid) {
      stateid = this._count++;
    } else {
      let { isExists, stateobj } = this.checkDuplicateState(stateid);
      if (isExists) return stateobj;
    }
    let tempState: State = new State(stateid);
    this._stateList.push(tempState);
    return tempState;
  }

  public updateState(stateobj: State): void {
    this._observer.next(stateobj);
  }

  public createNewState(stateid: string | number = undefined): State {
    return new State(stateid);
  }

  public registerState(stateObj: State): void {
    let { isExists, registerstateobj } = this.checkDuplicateRegisterState(stateObj.stateID);
    if (isExists) {
      registerstateobj.states.push(stateObj);
      console.log('isexist' , isExists)
    } else {

      let regState: RegisterState = new RegisterState();
      regState.stateID = stateObj.stateID;
      regState.states = [];
      regState.states.push(stateObj);
      this._allRegisteredState.push(regState);
      console.log('not exist' , this._allRegisteredState)

    }
  }

  public clearRegisterStateAsPerId(stateid: string | number): void {
    let { isExists, indexno } = this.checkDuplicateRegisterState(stateid);
    if (isExists) {
      this._allRegisteredState.splice(indexno, 1);
    }
  }

  public getRegisteredStatesAsPerId(stateid: string | number): RegisterState {
    let { registerstateobj } = this.checkDuplicateRegisterState(stateid);
    return registerstateobj;
  }

  private checkDuplicateState(checkid: string | number): any {
    for (let v of this._stateList) {
      if (v.stateID === checkid) {
        return { isExists: true, stateobj: v }
      }
    }
    return { isExists: false, stateobj: undefined };
  }

  private checkDuplicateRegisterState(checkid: string | number): any {
    let indexno: number = 0;
    console.log('allregis' ,checkid ,this._allRegisteredState)
    for (let v of this._allRegisteredState) {
      if (v.stateID === checkid) {
        return { isExists: true, registerstateobj: v, indexno: indexno }
      }
      indexno++;
    }
    return { isExists: false, registerstateobj: undefined, indexno: -1 };
  }


  set currentstate(value: string) {
    this._currentstate = value;
  }

  get currentstate() {
    return this._currentstate;
  }

  set previousstate(value: string) {
    this._previousstate = value;
  }

  get previousstate() {
    return this._previousstate;
  }

  set stateData(value: any) {
    this._stateData = value;
  }

  get stateData() {
    return this._stateData;
  }

  get stateObserver(): Observable<State> {
    return this._observer.asObservable();
  }



}

