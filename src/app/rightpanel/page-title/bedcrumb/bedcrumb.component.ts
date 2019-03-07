import { Component, OnInit, ViewEncapsulation, OnDestroy  } from '@angular/core';
import { CompLoadManagerService } from '../../../utils/computils/comp-load-manager.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hmis-bedcrumb',
  templateUrl: './bedcrumb.component.html',
  styleUrls: ['./bedcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BedcrumbComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private title:string;

  constructor(private compLoadManager:CompLoadManagerService) {
    this._subscription =  this.compLoadManager.managerObs.subscribe(val=>{
      this.title = val;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
