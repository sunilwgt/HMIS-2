import { Component, OnInit } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { MODE_ADD } from '../../models/common';
import { Subscription } from 'rxjs/Subscription';
import { HmisExternalApisService } from '../../services/hmis-external-apis.service';

@Component({
  selector: 'app-docrepo',
  templateUrl: './docrepo.component.html',
  styleUrls: ['./docrepo.component.scss']
})
export class DocrepoComponent extends BaseComponent implements OnInit {

  private filesize:number = 0;
  private filename:string = "";

  private _apiSubscription: Subscription;

  constructor(baseService: BaseServices,
    private externalApis:HmisExternalApisService) {
    super(baseService);
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {

    }
  }

  invokeAddFunction(): void {
  }

  private getFiles(evnt:any):void{
    let files:any = evnt.srcElement.files;
    this.filesize = files[0].size;
    this.filename = files[0].name;
   // console.log(files[0]);
    this.externalApis.loadProfileImage(files[0]);
  }

  private dropHandler(evnt:any):void{
    let files:any = evnt.files;
    this.filesize = files[0].size;
    this.filename = files[0].name;
  }

  ngOnDestroy() {
    //this._apiSubscription.unsubscribe();
  }

}
