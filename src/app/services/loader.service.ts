import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
  private _showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get showLoader() {
    return this._showLoader.asObservable();
  }

  set showLoader(value:any){
    this._showLoader.next(value);
  }


}
