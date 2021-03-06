import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { ActionType, MODE_EDIT, RL_ADMISSION, MODE_VIEW, MODE_DELETE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_ADMISSION_TYPE_BY_ID, UPDATE_FIELD_STATE, MODE_ADD, RESULT_TYPE_DELETE_ADMISSION, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, MODE_DISCHARGE, MODE_OT, RL_DISEASE_LIST, RL_DISCHARGE_MODAL, RL_BUILDING, RL_OT, MODE_OTHERS, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST } from '../../../models/common';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { State } from '../../../models/state';
import { HelperFunction } from '../../../utils/helper-function.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
// import { Angular2Csv } from 'angular2-csv';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
declare var jsPDF: any;
@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.scss']
})

export class AdmissionListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  private isreadonly = true;
  modalOption: NgbModalOptions;
  private modalRef: NgbModalRef;
  closeResult: any;
  private displaydialog: boolean = false;
  private clickdialog: boolean = false;
  private rowdata: any;
  private searchStr: any;
  private admissionList = [];
  private admissionListResource = new DataTableResource([]);
  private admissionListCount = 0;
  private patientDetails = [];
  private admittedPatientDetails = [];
  private _subscription: Subscription;
  public patientName = [];
  public doctorArray = [];
  private _updateStateObj: State;
  private hospitaldata;
  private patient_registration_no: string;
  private dateValueto: Date;
  private dateValuefrom: Date; ''
  private convertedfromdate;
  private convertedtodate;
  private csvdata = [];
  constructor(private baseService: BaseServices, private modalServices: NgbModal, public datepipe: DatePipe, private helperFunc: HelperFunction,
    private snackbar: MatSnackBar, ) {
    super(baseService);
    // this.hmisApi.getAdmittedPatientList("");
    this.hmisApi.getHospitalSettings("");

  }
  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_ADMITTED_PATIENT_LIST) {
      this.admissionList = data.result;
      this.csvdata = data.result;
      this.arrangeAdmittedPatientData(data.result);
      this.admissionListResource = new DataTableResource(this.admissionList);
      this.admissionListResource.count().then(count => {
        this.admissionListCount = count;
      });
      const para = { offset: 0, limit: 15 }
      this.reloadAdmittedPatientsList(para);
      // }
    }

    if (data.resulttype === RESULT_TYPE_DELETE_ADMISSION) {
      this.hmisApi.getAdmittedPatientList(this.convertedfromdate, this.convertedtodate, '');
    }

    if (data.resulttype === RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID) {
      this.compLoadManager.redirect(RL_ADMISSION);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }
  }

  private arrangeAdmittedPatientData(result) {
    for (let key in result) {
      var dateOfAdmission = this.admissionList[key].created_on.split("T");
      this.admissionList[key]['admitted_on'] = this.datepipe.transform(dateOfAdmission[0], 'dd-MM-yyyy');
      this.admissionList[key]['patient_name'] = this.admissionList[key].patient_first_name + ' ' + this.admissionList[key].patient_last_name;
      var patientDob = this.admissionList[key].patient_dob === null ? " " : this.admissionList[key].patient_dob.split("T");
      this.admissionList[key]['patient_age'] = this.helperFunc.getCalculatedAge(patientDob[0]);
      //var bedNumber = this.admissionList[key].bed_number.split("-");
      /// this.admissionList[key]['bed_number'] = bedNumber[2];
      //this.admissionList[key].ward_number = this.admissionList[key].ward_name;
      // this._updateStateObj.currentstate = 'ward_number';
      // this._updateStateObj.stateData = this.admissionList;
      // this.stateService.updateState(this._updateStateObj);
    }
  }

  reloadAdmittedPatientsList(params) {
    this.admissionListResource.query(params).then(admissionList => this.admissionList = admissionList);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  setdischargestyle(n) {
    if (n > 0) {
      return { color: 'red' }
    } else {
      return { color: 'green' }
    }
  }
  setotstyle(n) {
    if (n > 0) {
      return { color: 'red' }
    } else {
      return { color: 'green' }
    }
  }
  ongridclick(e, item, con) {
    if (this.clickdialog === false) {
      this.displaydialog = true;
      this.rowdata = item;
      this.open(con)
    }
  }
  ongridclick2(e, item, con) {
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
  private ClickEventHandler(eventObj: ActionType, mode, item): void {
    // this.clickdialog = true;
    // setInterval(() => {
    //   this.clickdialog = false;
    // }, 1);
    switch (mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_ADMISSION);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        break;

      case MODE_VIEW:
        this.compLoadManager.redirect(RL_ADMISSION);
        this.state.currentstate = MODE_VIEW;
        item.value = item.doctor_name
        console.log('i' , item)
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        break;

      case MODE_DELETE:
        this.hmisApi.deleteAdmittedPatient(item.ID);
        break;

      case MODE_ADD:

        // console.log('discharge obj', eventObj)
        if (item.Discharged > 0) {
          this.snackbar.open('Patient discharged', 'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
        } else {
          this.stateService.stateData = eventObj.data;
          this.state.stateData = item;
          this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_ADD });
          this.compLoadManager.redirect(RL_DISCHARGE_MODAL);
        }
        break;
      case MODE_OT:
     console.log('enterd ot')
        if (item.OpenOT > 0) {
          this.snackbar.open('Patient has an active OT entry. Please update patient previous OT details.', 'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
        } else {
     console.log('state' , this.state)

          this.state.currentstate = MODE_ADD;
     console.log('state2' , this.state)

          this.hmisApi.getPatientDetailsForOTOnSearchId(item.ID);
          this.compLoadManager.redirect(RL_OT)
        }

        break;
      case MODE_OTHERS:
        // this.comonService.createPdfStructure(eventObj.data, "ADMISSION");
        this.createPdfStructureofadmission(item, "ADMISSION");

        break;

    }

  }


  private addAdmission(): void {
    const a = this.baseService.comonService.getpermissionrole();
    if (a === 'readonly') {
      // alert('not allowed')
      this.snackbar.open('Not Allowed', 'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {
      this.state.currentstate = MODE_ADD;
      this.compLoadManager.redirect(RL_ADMISSION);
    }

  }

  ngOnInit() {
    this.compLoadManager.setHeaderTitle('Patients')
    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      this.isreadonly = true;
    } else {
      this.isreadonly = false;
    }
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.getdate();
    this.hmisApi.getAdmittedPatientList(this.convertedfromdate, this.convertedtodate, '');
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
    this.setdate(this.convertedfromdate, this.convertedtodate)

  }

  setdate(f, t) {
    this.comonService.setdateforadmissionsearch(f, t)
  }

  searchAdmittedPatient() {
    this.hmisApi.getAdmittedPatientList(this.convertedfromdate, this.convertedtodate, this.searchStr);
  }

  exportToCSV() {
   

    _.forEach(this.admissionList, (value, key) => {
      var newArray: any = {
        "patient_registration_no": value.patient_registration_no,
        "admission_sequence": value.admission_sequence,
        "patient_first_name": value.patient_first_name,
        "patient_last_name": value.patient_last_name,
        "patient_sex": value.patient_sex,
        "patient_phone": value.patient_phone,
        "doctor_name": value.doctor_name,
        "building_name": value.building_name,
        "ward_name": value.ward_name,
        "bed_number": value.bed_number,
        
      };
      this.csvdata.push(newArray);
    });
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      headers: ["Registeration Number", "Admission No.", "First Name", "Last Name" , "Gender" , "Phone" , "Doctor Under" , "Building Name" , "Ward Name" , "Bed Number"]
    };
    new Angular2Csv(this.csvdata, 'Admission  list', options);
  }


  createPdfStructureofadmission(data: any, state: string) {
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);

    //set header of prescription
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
    doc.text("ADDRESS:" + this.hospitaldata.address, 290, 90, 'center');

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(134, 0, 0);
    doc.setFontSize(12);
    doc.text("Phone:" + this.hospitaldata.phone_number, 290, 105, 'center');


    if (state === "ADMISSION") {
      doc.setFontType("normal");
      doc.setTextColor(0, 0, 0);
      doc.setTextColor(134, 0, 0);
      doc.text("Reg No :  ", 45, 150, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_registration_no, 100, 150, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Admission SEQ :  ", 350, 150, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.admission_sequence, 450, 150, 'left');
      doc.setFontSize(10);
      doc.setTextColor(134, 0, 0);
      doc.text("DATE :  ", 350, 170, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(this.datepipe.transform(new Date(), 'dd-MM-yyyy'), 450, 170, 'left');
      doc.setFontSize(12);

      //Patient Details
      doc.setTextColor(134, 0, 0);
      doc.text("Patient Details :", 45, 200, 'left');
      doc.line(45, 205, 550, 205);
      doc.setLineWidth(1.5);
      doc.setTextColor(134, 0, 0);
      doc.text("Patient's Name :", 45, 230, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_name, 150, 230, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Age :", 45, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + data.patient_age, 80, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Sex :", 170, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_sex, 210, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Religion :", 295, 250, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_religion === undefined ? data.religion : data.patient_religion, 350, 250, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Bed No :", 45, 270, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.bed_no === undefined ? data.bed_number : data.bed_no, 100, 270, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Name Of (Father/Husband/Gurdian) :", 45, 290, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.name_of_gurdian, 280, 290, 'left');

      // Patients Address
      doc.setTextColor(134, 0, 0);
      doc.text("Patient Address :", 45, 320, 'left');
      doc.line(45, 325, 550, 325);
      doc.setLineWidth(1.5);
      doc.text("Address :", 45, 350, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_address, 150, 350, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Admitted By Whom :", 45, 370, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.name_of_gurdian, 200, 370, 'left');

      //Relative Address
      doc.setTextColor(134, 0, 0);
      doc.text("Patient's Relative's Address :", 45, 450, 'left');
      doc.line(45, 455, 550, 455);
      doc.setLineWidth(1.5);
      doc.text("Address :", 45, 480, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patient_address, 150, 480, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Telephone/Contact No :", 45, 500, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + data.gurdian_ph_number, 200, 500, 'left')
      doc.setTextColor(134, 0, 0);
      doc.text("Date Of Admission :", 45, 520, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.admitted_on, 200, 520, 'left');
      doc.setTextColor(134, 0, 0);
      doc.text("Under Doctor :", 45, 540, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text(data.doctor_name, 150, 540, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text("I do here by give my Consent for treatment anaesthesia and operation of the patient named above", 45, 570, 'left');
      doc.text("knowing all ins and outsof the Nursing Home. I agree to pay all the charges of the Nursing Home  ", 45, 585, 'left');
      doc.text("when advised and guided bt the rules and regulations of the Nursing Home.The patient vcan be ", 45, 600, 'left');
      doc.text("reffer to some other Institution for better management, as the patient might require some ", 45, 615, 'left');
      doc.text("specific treatment which we may not have required Amenities ", 45, 630, 'left');




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
      ///////////////////////////////////////////////////////////////////end body////////////////////////////////////////////////////
      //footer
      doc.setLineWidth(1.5);
      doc.setDrawColor(31, 132, 0);
      doc.line(40, 780, 550, 780);

      doc.setFont("helvetica");
      doc.setFontType("italic");
      doc.setTextColor(134, 0, 0);
      doc.setFontSize(10);
      doc.text(this.hospitaldata.hospital_name + " *Phone:" + this.hospitaldata.phone_number, 290, 795, 'center');

      doc.save(data.patient_name + '.pdf');
    }

  }

}
