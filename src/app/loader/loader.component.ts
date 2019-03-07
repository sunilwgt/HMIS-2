import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'hmis-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  private showDiv:boolean = false;
  private _subscription: Subscription;

  constructor(private loader:LoaderService) {
    this._subscription = this.loader.showLoader.subscribe(data=>{
      setTimeout(() => {
        this.showDiv = data;
      }, 100);

    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();

  }

}
