export class State {

  private _currentstate: string;
  private _previousstate: string;
  private _stateData: any;
  private _stateID: string | number;
  private _instanceID: string;

  constructor(stateid: string | number) {
    this._stateID = stateid;
  }

  get stateID() {
    return this._stateID;
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


  set instanceID(value: any) {
    this._instanceID = value;
  }

  get instanceID() {
    return this._instanceID;
  }

}

export class RegisterState {
  stateID: string | number;
  states: Array<State> = [];

  constructor() {

  }
}

