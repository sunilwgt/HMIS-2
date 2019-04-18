import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentInfo } from '../models/compinfo';
import { CompLoadManagerService } from '../utils/computils/comp-load-manager.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'hmis-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightpanelComponent implements OnInit {

  private _compinfo:ComponentInfo;
  private _subscription: Subscription;

  constructor(private _compManager:CompLoadManagerService) {
    this._subscription = this._compManager.dataObserver.subscribe(data=>{
      if(data.type === "container"){
        this._compinfo = data.value;
      }

    });

   }

  ngOnInit() {

  }
  method(){
    console.log('wjebfiuwe');
    
  }
}
