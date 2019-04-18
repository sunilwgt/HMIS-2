import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ErrorService {

  private _errorSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  public throwErrors(data:any){
    this._errorSub.next(data);
  }

  get errorObserver() {
    return this._errorSub.asObservable();
  }


}
