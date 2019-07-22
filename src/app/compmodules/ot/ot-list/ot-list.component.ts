import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_OT, RESULT_TYPE_GET_PATIENT_SEARCH, RESULT_TYPE_GET_OPERATION_THEATRE_LIST, MODE_DISCHARGE_BED, RESULT_TYPE_DELETE_OPERATION_THEATRE, RESULT_TYPE_RELEASED_TO_BED, RESULT_TYPE_GET_OT_LIST_DATEWISE, UPDATE_FIELD_STATE, ACTION_BUTTON_STATE, EDIT, VIEW, DELETE } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { DatePipe } from '@angular/common';
import { HelperFunction } from '../../../utils/helper-function.service';
import { OtCreate } from '../../../models/patient';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Angular2Csv } from 'angular2-csv';
import * as _ from 'lodash';

@Component({
  selector: 'app-ot-list',
  templateUrl: './ot-list.component.html',
  styleUrls: ['./ot-list.component.scss']
})
export class OtListComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  public _stateObj: State;
  private csvdata = []
  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  private rowdata: any;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private dateValuefrom;
  private dateValueto;
  private convertedfromdate;
  private convertedtodate;
  private OTList = [];
  private OTResource = new DataTableResource([]);
  private OTCount = 0;
  private OTModel: OtCreate = new OtCreate();
  private isReleasedToBed: string;
  private _updateStateObj: State;

  constructor(private baseService: BaseServices, private modalServices: NgbModal, public datepipe: DatePipe, private helperFunc: HelperFunction) {
    super(baseService);
    // this.hmisApi.getOperationTheatreListing("");
  }

  hmisApiSubscribe(data: any): void {
    // if (data.resulttype === RESULT_TYPE_GET_OPERATION_THEATRE_LIST) {
    //   this.OTList = data.result;
    //   this.arrangeOTPatientData(data.result);
    //   this.OTResource = new DataTableResource(this.OTList);
    //   this.OTResource.count().then(count => {
    //     this.OTCount = count;
    //   });
    // }
    if (data.resulttype === RESULT_TYPE_GET_OT_LIST_DATEWISE) {
      console.log('data' , data);
      this.OTList = data.result;
      this.arrangeOTPatientData(data.result);
      this.OTResource = new DataTableResource(this.OTList);
      this.OTResource.count().then(count => {
        this.OTCount = count;
      });
    }
    if (data.resulttype == RESULT_TYPE_DELETE_OPERATION_THEATRE) {
      // this.hmisApi.getOperationTheatreListing("");
      this.hmisApi.getotlistdatewise(this.convertedfromdate, this.convertedtodate, '');
    }

    if (data.resulttype == RESULT_TYPE_RELEASED_TO_BED) {
      if (data.result == true) {
        this.hmisApi.getOperationTheatreListing("");
      }
    }
  }

  private arrangeOTPatientData(result) {
    for (let key in result) {
      var dateOfOT = this.OTList[key].operation_datetime.split("T");
      console.log('otlistdate1' , dateOfOT)
      this.OTList[key]['operation_datetime'] = dateOfOT[0]
      // this.OTList[key]['operation_datetime'] = this.datepipe.transform(dateOfOT[0], 'dd-MM-yyyy');s

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


  // ongridclick1(e, item, con) {
  //   console.log('item', item);
  //   if (this.clickdialog === false) {
  //     this.displaydialog = true;
  //     this.rowdata = item;
  //     this.open(con)
  //   }
  // }

  

  // open(content) {
  //   this.modalRef = this.modalServices.open(content, { size: 'lg' })
  // }
  closemodal(reason) {
    this.modalRef.close()
  }

  // private clickEventHandler(eventObj: ActionType): void {
  //   this.clickdialog = true;
  //   setInterval(() => {
  //     this.clickdialog = false;
  //   }, 1);
  //   switch (eventObj.mode) {
  //     // case MODE_EDIT:
  //     //   this.compLoadManager.redirect(RL_OT);
  //     //   break;

  //     // case MODE_VIEW:
  //     //   this.compLoadManager.redirect(RL_OT);
  //     //   break;

  //     // case MODE_DELETE:
  //     //   this.hmisApi.deleteOperationTheatreAsPerId(eventObj.data.operation_id);
  //     //   break;


  //     case MODE_DISCHARGE_BED:
  //       this.OTModel = this.comonService.IsReleaseToBed(eventObj.data);
  //       this.OTModel.created_by = this.hmisApi.userDetail.created_by;
  //       this.OTModel.modified_by = this.hmisApi.userDetail.modified_by;
  //       this.hmisApi.updateOTDetails(eventObj.data.operation_id, this.OTModel);
  //       break;
  //   }

  // }

  // private ClickEventHandler(eventObj: ActionType, mode, item): void {
  //   console.log('mode' , mode , item)
  //   this.clickdialog = true;
  //   setInterval(() => {
  //     this.clickdialog = false;
  //   }, 1);
  //   switch (mode) {
  //     case MODE_EDIT:
  //       console.log('edititem', item);
  //       this.compLoadManager.redirect(RL_OT);
  //       this.state.currentstate = MODE_EDIT;
  //       this.state.stateData = item;
  //       this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
  //       break;

  //     case MODE_VIEW:
  //     console.log('modeview', item);

  //       this.compLoadManager.redirect(RL_OT);
  //       this.state.currentstate = MODE_VIEW;
  //       this.state.stateData = item;
  //       this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
  //       break;

  //     case MODE_DELETE:
  //       this.hmisApi.deleteOperationTheatreAsPerId(item.operation_id);
  //       break;
  //   }

  // }




  private ClickEventHandler(eventObj: ActionType, mode, item): void {
    console.log('eventObj', eventObj, mode, item);
    switch (mode) {
      case MODE_EDIT:
        this._stateObj.currentstate = EDIT;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        this.compLoadManager.redirect(RL_OT);
        break;

      case MODE_VIEW:
        this._stateObj.currentstate = VIEW;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        this.compLoadManager.redirect(RL_OT);
        break;

      case MODE_DELETE:
        this._stateObj.currentstate = DELETE;
        this.updateState(this._stateObj);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        this.hmisApi.deleteOperationTheatreAsPerId(item.ID);
        break;
    }
  }


  private addot(): void {
    this.openCompInAddMode(RL_OT);
  }

  ngOnInit() {
    this.compLoadManager.setHeaderTitle('OT')

    //console.log(films);
    this._stateObj = this.baseService.stateService.createState(ACTION_BUTTON_STATE);

    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.getdate();
    this.hmisApi.getotlistdatewise(this.convertedfromdate, this.convertedtodate, '');
  }
  searchPatient() {
    // console.log('from' , this.dateValuefrom , 'to' , this.dateValueto)
    this.convertdate();
    this.hmisApi.getotlistdatewise(this.convertedfromdate, this.convertedtodate, '');
  }
  getdate() {
    const data = new Date();
    this.dateValuefrom = data;
    this.dateValueto = data;
    this.convertdate()
  }
  convertdate() {
    const a = this.comonService.convertdate(this.dateValuefrom, this.dateValueto)
    this.convertedfromdate = a.from;
    this.convertedtodate = a.to;
    this.setdate(this.convertedfromdate, this.convertedtodate)

  }
  setdate(f, t) {
    this.comonService.setdateforotsearch(f, t)
  }
  exportToCSV() {
    console.log('data', this.OTList)

    // console.log('before data' , this.csvdata)
    // if(csvdata.length  > 0){
    //   while(this.csvdata.length > 0){
    //     csvdata.pop()
    //   }
    // }
    // console.log('after data' , this.csvdata)

    _.forEach(this.OTList, (value, key) => {
      var newArray: any = {
        "patient_registration_no": value.patient_registration_no,
        "admission_sequence": value.admission_sequence,
        "ot_sequence": value.ot_sequence,
        "patient_name": value.patient_name,
        "patient_sex": value.patient_sex,
        "patient_phone": value.patient_phone,
        "doctor_name": value.doctor_name,
        "operation_datetime": value.operation_datetime,
        "patient_operation_start": value.patient_operation_start,
        "patient_operation_end": value.patient_operation_end,
        "purpose_of_surgery": value.purpose_of_surgery,
        "special_instruction": value.special_instruction,
        "surgery_type_name": value.surgery_type_name,


      };
      this.csvdata.push(newArray);
    });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      headers: ["Registeration Number", "Admission No.", "Ot seq.", "Patient Name", "Gender", "Phone", "Doctor Under", "Operation Datetime", "Operation Start Time", "Operation End Time" , "Purpose of Surgery" , "Instruction" ,"Surgery Type"]
    };
    new Angular2Csv(this.csvdata, 'Ot list', options);
  }

}
