import { Component, OnInit, ViewChild, ViewEncapsulation, Inject, NgZone, Output, EventEmitter } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource, DataTablePagination } from 'angular5-data-table';
import { Registration } from '../../../models/registration';
import { HelperFunction } from '../../../utils/helper-function.service';
import { ActionType, MODE_EDIT, RL_REGISTRATION, MODE_VIEW, MODE_DELETE, RL_ADMISSION, RESULT_TYPE_GET_PATIENTS, RESULT_TYPE_SET_PATIENT, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_GET_PATIENT_SEARCH, MODE_OTHERS, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RL_REGISTRATION_LIST, RESULT_TYPE_DELETE_PATIENT, MODE_ADMISSION, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RL_PRESCRIPTION, VIEW, EDIT, RESULT_TYPE_GET_ALL_APPUSERS, RL_USER, MODE_ROLE_ASSIGN } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { UserDetail } from '../../../models/userole';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { State } from '../../../models/state';


declare var jsPDF: any;

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
    { provide: 'Window', useValue: window }
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent extends BaseComponent implements OnInit {
  public _stateObj: State;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  @Output() getdoctornameinsearch: EventEmitter<any> = new EventEmitter();
  showNav: any = [];
  private tabIndex: number = 0;
  private once = false;
  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;

  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;

  private usersResource = new DataTableResource([]);
  private users = [];
  private arrangeusersdata = [];
  private usersCount = 0;
  private admissionRL: string = RL_ADMISSION;
  public doctorArray = [];
  public doctorDetailsArray = [];
  public patientDetails = [];
  private singlePatientData = [];
  private _userDetail: UserDetail;
  private DoctorInfo: any;
  private pdfData: any;
  private hospitaldata;
  admissionstatus: boolean;
  private rowdata: any;
  private dateValueto: Date;
  private dateValuefrom: Date; ''
  private convertedfromdate;
  private convertedtodate;
  @ViewChild(DataTable) patientsTable;
  @Inject('Window') private window: Window;
  constructor(baseService: BaseServices, private helperFunc: HelperFunction, private modalServices: NgbModal,
    public datepipe: DatePipe, private snackbar: MatSnackBar, private zone: NgZone, public modal: NgbActiveModal) {
    super(baseService);
    this.showNav[0] = true;
    this.hmisApi.userSearch("");
    // this.hmisApi.getHospitalSettings('');
  }
  h(i) {
  }
  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
    this.tabIndex = index;
  }
  ongridclick(e, item, con) {
    if (this.clickdialog === false) {
      this.displaydialog = true;
      this.rowdata = item;
      this.open(con)


    }
  }


  open(content) {
    this.modalRef = this.modalServices.open(content, { size: 'lg' })
  }
  closemodal(reason) {
    this.modalRef.close()
  }


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }



  public openSnackBar(errorText: string): void {
    this.zone.run(() => {
      const snackBar = this.snackbar.open(errorText, 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      })
    });
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ALL_APPUSERS) {
      this.users = data.result;
      console.log('all users data' , data);
    
      this.arrangeusersdata = this.users;
      this.usersResource = new DataTableResource(this.arrangeusersdata);
      this.usersResource.count().then(count => {
        this.usersCount = count;
      });
      const para = { offset: 0, limit: 15 }
      this.reloadPatients(para);
    }

    if (data.resulttype === RESULT_TYPE_DELETE_PATIENT) {
      const a = this.comonService.regdateobserver();
      this.hmisApi.patientSearch(a.from, a.to, '');
      // this.hmisApi.patientSearch("");
    }

   
   
  }

  reloadPatients(params) {
    console.log('wel;')
    this.usersResource.query(params).then(users => this.arrangeusersdata = users);
    this.snackbar.open('Page Refreshed', 'Close',
    {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  
  Refreshpage(){
    console.log('wel;')
    this.hmisApi.userSearch("");

  }

  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };


  private clickEventHandler(eventObj: ActionType, mode, item): void {
    console.log('eventObj', eventObj, mode, item)
    // this.clickdialog = true;
    // setInterval(() => {
    //   this.clickdialog = false;
    // }, 1);
    switch (mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_USER);
        // this.hmisApi.getPatientAsPerIdFromEXT(eventObj.data.ID);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        // this.getdoctornameinsearch.emit({ doctor_name: this.state.stateData.doctor_name });
        // this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_USER);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        break;

      case MODE_DELETE:
        this.hmisApi.deletePatientAsPerId(item.ID);
        // this._stateObj.currentstate = DELETE;
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        break;
        
        // case MODE_ROLE_ASSIGN:
        // console.log('mode role')
        // this.compLoadManager.redirect(RL_USER);
        // // this.hmisApi.getPatientAsPerIdFromEXT(eventObj.data.ID);
        // this.state.currentstate = MODE_EDIT;
        // this.state.stateData = item;
        // // this.getdoctornameinsearch.emit({ doctor_name: this.state.stateData.doctor_name });
        // this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        // break;

      case MODE_OTHERS:
        this.hmisApi.getDoctorAsPerId(eventObj.data.Reffered_Doctor);
        this.pdfData = eventObj;
        break;

      
   
     
    }

  }

  private createFormat(data: any) {

  }

  private createPdfStructure(eventObj: ActionType): void {
    var fileName = eventObj.data.patient_first_name + ' ' + eventObj.data.patient_last_name + '.pdf';

    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);

    var img = new Image;
    img.src = "app/images/left_logo.png";
    img.crossOrigin = "";

    doc.addImage(img.src, 'PNG', 50, 26, 60, 50);
    doc.addImage(img.src, 'PNG', 495, 26, 60, 50);

    doc.setFont("helvetica");
    doc.setFontType("bolduderline");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(35);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(196, 53, 404, 53);
    // doc.text("JEEVANDEEP", 300, 50, 'center');
    doc.text(this.hospitaldata.hospital_name, 300, 50, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italicunderline");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(20);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(115, 73, 490, 73);
    doc.text("SPECIAL CARE & DIAGNOSTIC CENTRE", 300, 70, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(10);
    // doc.text("Bhakuri * P.O. Chakla * P.S.-Berhampore * Dist.- Murshidabad", 290, 90, 'center');
    doc.text("ADDRESS:" + this.hospitaldata.address, 290, 90, 'center');


    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(12);
    // doc.text("Phone: (03482) 224510/224511), 9434229741, 9333311277", 290, 105, 'center');
    doc.text("Phone:" + this.hospitaldata.phone_number, 290, 105, 'center');



    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setFontType("normal");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(12);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    doc.setTextColor(134, 0, 0);
    doc.text("Registration No:", 45, 150, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(eventObj.data.patient_registration_no, 155, 150, 'left');

    doc.setTextColor(134, 0, 0);
    doc.text("Patient Name:", 45, 165, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(eventObj.data.patient_first_name + ' ' + eventObj.data.patient_last_name, 155, 165, 'left');

    // doc.setTextColor(134, 0, 0);
    // doc.text("Blood group :",45,180,'left');
    // doc.setTextColor(0, 0, 0);
    // doc.text(eventObj.data.patient_blood_group === undefined?"":eventObj.data.patient_blood_group,400,180,'left');

    doc.setTextColor(134, 0, 0);
    doc.text("Age:", 45, 180, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text('' + eventObj.data.patient_age, 155, 180, 'left');

    doc.setTextColor(134, 0, 0);
    doc.text("Gender:", 45, 195, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(eventObj.data.patient_sex, 155, 195, 'left');

    doc.setTextColor(134, 0, 0);
    doc.text("Reffered Doctor:", 45, 210, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.DoctorInfo, 155, 210, 'left');

    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(45, 220, 550, 220);


    // signature
    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(40, 700, 180, 700);
    doc.text("Concerned Signature", 50, 715, 'left');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(400, 700, 530, 700);
    doc.text("Patient Signature", 500, 715, 'right');

    //footer
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(40, 780, 550, 780);

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(10);
    // doc.text("Jeevandeep Nursing Home * Phone: (03482) 224510/224511), 9434229741, 9333311277", 290, 795, 'center');
    doc.text(this.hospitaldata.hospital_name + " *Phone:" + this.hospitaldata.phone_number, 290, 795, 'center');
    doc.save(fileName);

  }
  ngOnInit() {
    // this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.getdate();
    this.hmisApi.patientSearch(this.convertedfromdate, this.convertedtodate, '');
  }

  searchPatient() {
    this.convertdate();
    this.hmisApi.getAdmittedPatientList(this.convertedfromdate, this.convertedtodate, '');

  }

  getdate() {
    const data = new Date();
    this.dateValuefrom = data;
    this.dateValueto = data;
    this.convertdate();
  }



  convertdate() {
    const a = this.comonService.convertdate(this.dateValuefrom, this.dateValueto)
    this.convertedfromdate = a.from;
    this.convertedtodate = a.to;
    this.setdate(this.convertedfromdate, this.convertedtodate);
  }

  setdate(f, t) {
    this.comonService.setdateforregsearch(f, t)
  }

  onc(a, b, c) {
    console.log(a, b, c)
    if (this.once === true) {
      this.once = false;
    }

    if (this.once === false) {
      this.once = true;
    }
  }
}
