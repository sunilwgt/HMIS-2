import { Component, OnInit, } from '@angular/core';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';
import { RESULT_TYPE_GET_BED_BY_WARD, Option } from '../../models/common';

@Component({
  selector: 'bed-popup',
  templateUrl: './bed-popup.component.html',
  styleUrls: ['./bed-popup.component.scss']
})

export class BedModal extends BaseComponent implements OnInit {

  private beds: Array<any>;
  private IsAvailable:boolean=false;
  //private bedListOption: Array<Option> = [];

  constructor(baseService: BaseServices) {
    super(baseService);
    // this.hmisApi.getBed();

    this.comonService.selectedWard;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_BED_BY_WARD) {
      this.beds = this.comonService.bedOptions(data.result);
      if(this.beds.length == 0){
        this.IsAvailable = true;
      } 
    }

  }

  ngOnInit() {
    // this.beds = [
    //   { label: "1", id: 1 },
    //   { label: "2", id: 2 },
    //   { label: "3", id: 3 },
    //   { label: "4", id: 4 },
    //   { label: "5", id: 5 },
    //   { label: "6", id: 6 },
    //   { label: "7", id: 7 },
    //   { label: "8", id: 8 },
    //   { label: "9", id: 9 },
    //   { label: "10", id: 10 },
    // ];
    if (this.comonService.selectedWard) {
      this.hmisApi.getBedByWard(this.comonService.selectedWard);
    }

  }


}
