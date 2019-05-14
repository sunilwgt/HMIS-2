import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_BILLING, RL_PACKAGES_TYPE, RL_DISCHARGE_CERTIFICATE, RESULT_TYPE_GET_DISCHARGE_CERTIFICATE_LIST, RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { DischargeCertificateOption } from '../../../models/department';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-discharge-certificate-list',
  templateUrl: './discharge-certificate-list.component.html',
  styleUrls: ['./discharge-certificate-list.component.scss'],

})
export class DischargeCertificateListComponent extends BaseComponent implements OnInit {
  private isreadonly = true;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();

  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private rowdata:any;
  private dateValuefrom;
    private dateValueto;
  private dischargeCertificates = [];
  private dischargeCertificateOption: Array<DischargeCertificateOption> = [];
  private dischargeCertificateResource = new DataTableResource([]);
  private dischargeCertificateCount = 0;
 


  constructor(baseService: BaseServices , private modalServices: NgbModal , private snackbar:MatSnackBar) {
    super(baseService);
    this.hmisApi.getDischargeCertificateList("");
  }
  hmisApiSubscribe(data: any): void {
    if(data.resulttype === RESULT_TYPE_GET_DISCHARGE_CERTIFICATE_LIST){
      this.modifyData(data.result);
      this.dischargeCertificates = data.result;
      this.dischargeCertificateResource = new DataTableResource(this.dischargeCertificates);
      this.dischargeCertificateResource.count().then(count => {
        this.dischargeCertificateCount = count;
      });
      
    }
    if(data.resulttype === RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE){
    }
  }

 private modifyData(data:any)
{
  for(let item of data){
    var admisionDate = item.date_of_admission === null?"": item.date_of_admission.split("T");
    item.date_of_admission = this.comonService.datepipe.transform(admisionDate[0],'dd-MM-yyyy');
    var dischargeDate = item.discharge_date === null? "": item.discharge_date.split("T");
    item.discharge_date = this.comonService.datepipe.transform(dischargeDate[0],'dd-MM-yyyy');
  }
  return data;
}

  reloaddischargeCertificates(params) {
    this.dischargeCertificateResource.query(params).then(dtypes => this.dischargeCertificates = dtypes);
  }
  createDischargeCertificate(data:any){
    data.operatio_treat
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
      

  private ClickEventHandler(eventObj: ActionType, mode, item): void {
    this.clickdialog = true;
    setInterval(() => {
    this.clickdialog = false;
  }, 1);
    switch (mode) {
      case MODE_EDIT:
        //this.createDischargeCertificate(eventObj.data);
        //this.hmisApi.getDischargeCertficateAsPerAdmissionIdRegNO(eventObj.data.admission_id,eventObj.data.patient_id);
        this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        break;

      case MODE_DELETE:
        break;
    }

  }


  private addDischrageCertificate(): void {
    const a = this.comonService.getpermissionrole();
    if(a=== 'readonly'){
      this.snackbar.open('Not Allowed', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }else{
      this.openCompInAddMode(RL_DISCHARGE_CERTIFICATE);

    }
  }

  ngOnInit() {
    const a = this.comonService.getpermissionrole();
    if(a === 'readonly'){
this.isreadonly = true;
    }else{
      this.isreadonly = false;

    }
    //console.log(films);
    this.getdate();
  }
  getdate(){
    const data  = new Date();
    this.dateValuefrom = data;
    this.dateValueto = data;
  }
}
