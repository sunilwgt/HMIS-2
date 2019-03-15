import { Component, OnInit } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { NewBorn } from '../../../models/opd';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, RL_NEW_BORN, RESULT_TYPE_GET_NEW_BORN_LIST, MODE_ADD, RESULT_TYPE_DELETE_NEW_BORN } from '../../../models/common';
import { DatePipe } from '@angular/common';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-new-born-list',
  templateUrl: './new-born-list.component.html',
  styleUrls: ['./new-born-list.component.scss']
})
export class NewBornListComponent extends BaseComponent implements OnInit {
  private newBorn = [];
  private newBornResource = new DataTableResource([]);
  private newBornCount = 0;


modalOption: NgbModalOptions;
private modalRef: NgbModalRef;
closeResult: any;
private displaydialog: boolean = false;
private clickdialog: boolean = false;
private rowdata:any;

  constructor(baseService: BaseServices, public datepipe: DatePipe ,  private modalServices: NgbModal) {
    super(baseService);
    this.hmisApi.getNewBornSearch("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_NEW_BORN_LIST) {
      //console.log("new born list     ",data.result);
      this.newBorn = data.result;
      this.arrangeDataForNewBorn(data.result);
      this.newBornResource = new DataTableResource(this.newBorn);
      this.newBornResource.count().then(count => {
        this.newBornCount = count;
      });
    }
    if(data.resulttype === RESULT_TYPE_DELETE_NEW_BORN){
      this.hmisApi.getNewBornSearch("");
    }
  }

  private arrangeDataForNewBorn(result) {
    for (let key in result) {
      if (this.newBorn[key].dob !== null) {
        var dateOfBirth = this.newBorn[key].dob.split("T");
        this.newBorn[key]['baby_dob'] = this.datepipe.transform(dateOfBirth[0], 'dd-MM-yyyy');
      }

    }
  }

  reloadNewBorn(params) {
    this.newBornResource.query(params).then(newBorn => this.newBorn = newBorn);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  ongridclick(e , con){
    if(this.clickdialog === false){
    this.displaydialog = true;
    this.rowdata = e.row.item;
    this.open(con)
    }
      }

      open(content) {
        this.modalRef =    this.modalServices.open(content , {size:'lg'})
         }
         closemodal(reason){
       this.modalRef.close()
         }
    

  private clickEventHandler(eventObj: ActionType): void {
    this.clickdialog = true;
    setInterval(() => {
    this.clickdialog = false;
  }, 1);
    switch (eventObj.mode) {
      case MODE_EDIT:
         this.compLoadManager.redirect(RL_NEW_BORN);
        break;

      case MODE_VIEW:
         this.compLoadManager.redirect(RL_NEW_BORN);
        break;

      case MODE_DELETE:
         this.hmisApi.deleteNewBornAsPerId(eventObj.data.ID);
        break;
    }
  }


  private addNewBorn(): void {
   this.state.currentstate = MODE_ADD;
    this.compLoadManager.redirect(RL_NEW_BORN);
  }

  ngOnInit() {
  }

}
