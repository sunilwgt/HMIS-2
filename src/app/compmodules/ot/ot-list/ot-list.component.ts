import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_OT, RESULT_TYPE_GET_PATIENT_SEARCH, RESULT_TYPE_GET_OPERATION_THEATRE_LIST, MODE_DISCHARGE_BED, RESULT_TYPE_DELETE_OPERATION_THEATRE, RESULT_TYPE_RELEASED_TO_BED } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { DatePipe } from '@angular/common';
import { HelperFunction } from '../../../utils/helper-function.service';
import { OtCreate } from '../../../models/patient';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ot-list',
  templateUrl: './ot-list.component.html',
  styleUrls: ['./ot-list.component.scss']
})
export class OtListComponent extends BaseComponent implements OnInit, OnDestroy {

  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  private rowdata: any;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private dateValuefrom;
  private dateValueto;

  private OTList = [];
  private OTResource = new DataTableResource([]);
  private OTCount = 0;
  private OTModel: OtCreate = new OtCreate();
  private isReleasedToBed: string;

  constructor(baseService: BaseServices, private modalServices: NgbModal, public datepipe: DatePipe, private helperFunc: HelperFunction) {
    super(baseService);
    this.hmisApi.getOperationTheatreListing("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_OPERATION_THEATRE_LIST) {
      this.OTList = data.result;
      this.arrangeOTPatientData(data.result);
      this.OTResource = new DataTableResource(this.OTList);
      this.OTResource.count().then(count => {
        this.OTCount = count;
      });
    }

    if (data.resulttype == RESULT_TYPE_DELETE_OPERATION_THEATRE) {
      this.hmisApi.getOperationTheatreListing("");
    }

    if (data.resulttype == RESULT_TYPE_RELEASED_TO_BED) {
      if (data.result == true) {
        this.hmisApi.getOperationTheatreListing("");
      }
    }
  }

  private arrangeOTPatientData(result) {
    for (let key in result) {
      var dateOfOT = this.OTList[key].created_on.split("T");
      this.OTList[key]['operation_date'] = this.datepipe.transform(dateOfOT[0], 'dd-MM-yyyy');
      var OTtime = this.OTList[key].patient_operation_start === null ? "" : this.OTList[key].patient_operation_start.split("T");
      this.OTList[key]['patient_operation_start'] = OTtime[1];
      var OTEndTime = this.OTList[key].patient_operation_end === null ? "" : this.OTList[key].patient_operation_end.split("T");
      this.OTList[key]['patient_operation_end'] = OTEndTime[1];
      // this.isReleasedToBed = this.OTList[key].Is_Released_to_Bed;
      // this.stateService.stateData = this.isReleasedToBed;
      // console.log(this.stateService.stateData);
    }
  }


  reloadOT(params) {
    this.OTResource.query(params).then(dtypes => this.OTList = dtypes);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  // ongridclick(e, con) {
  //   if (this.clickdialog === false) {
  //     this.displaydialog = true;
  //     this.rowdata = e.row.item;
  //     this.open(con)
  //   }
  // }

  // open(content) {
  //   this.modalRef = this.modalServices.open(content, { size: 'lg' })
  // }

  // closemodal(reason) {
  //   this.modalRef.close()
  // }


  ongridclick1(e ,item , con){
    console.log('item',item);
    if(this.clickdialog === false){
    this.displaydialog = true;
    this.rowdata = item;
    this.open(con)
    }
      }

      searchPatient(){
        // console.log('from' , this.dateValuefrom , 'to' , this.dateValueto)
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
        this.compLoadManager.redirect(RL_OT);
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_OT);
        break;

      case MODE_DELETE:
        this.hmisApi.deleteOperationTheatreAsPerId(eventObj.data.operation_id);
        break;

      case MODE_DISCHARGE_BED:
        this.OTModel = this.comonService.IsReleaseToBed(eventObj.data);
        this.OTModel.created_by = this.hmisApi.userDetail.created_by;
        this.OTModel.modified_by = this.hmisApi.userDetail.modified_by;
        this.hmisApi.updateOTDetails(eventObj.data.operation_id, this.OTModel);
        break;
    }

  }


  private addot(): void {
    this.openCompInAddMode(RL_OT);
  }

  ngOnInit() {
    //console.log(films);
    this.getdate();
  }
  getdate(){
    const data  = new Date();
    this.dateValuefrom = data;
    this.dateValueto = data;
  }
}
