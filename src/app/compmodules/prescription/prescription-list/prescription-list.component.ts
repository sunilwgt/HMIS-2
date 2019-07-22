import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter } from '@angular/core';
import { DataTableTranslations, DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { RL_DEPARTMENT, RESULT_TYPE_GET_DEPARTMENT, RL_BUILDING, RESULT_TYPE_GET_BUILDING, ActionType, MODE_EDIT, MODE_VIEW, MODE_DELETE, ADD, RL_BILLING, RL_PRESCRIPTION, RESULT_TYPE_GET_PRESCRIPTION, MODE_OTHERS, RESULT_TYPE_SET_PRESCRIPTION_AS_PER_ID, RESULT_TYPE_DELETE_PRESCRIPTION, MODE_ADD, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION, RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION_BY_ID, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST } from '../../../models/common';
import { State } from '../../../models/state';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import * as _ from 'lodash';
import { HelperFunction } from '../../../utils/helper-function.service';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { patientListOption } from '../../../models/patient';
declare var jsPDF: any;
@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss'],
  providers: [
    { provide: 'Window', useValue: window }
  ],
  encapsulation: ViewEncapsulation.None
})
export class PrescriptionListComponent extends BaseComponent implements OnInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  private isreadonly = true;
  private prescription = [];
  private prescriptionResource = new DataTableResource([]);
  private precriptionCount = 0;
  private patientName: string;
  private doctorName: string;
  private prescribedDate: string;
  private prescribedPatientDetails = [];
  private patientList = [];
  private hospitaldata;
  @Inject('Window') private window: Window;

  constructor(baseService: BaseServices, private helperFunc: HelperFunction) {
    super(baseService);
    this.hmisApi.getPrescriptionSearch("");
    this.hmisApi.getHospitalSettings("");


  }


  hmisApiSubscribe(data: any): void {

    if (data.resulttype === RESULT_TYPE_GET_PRESCRIPTION) {
      this.prescribedPatientDetails = data.result;
      this.arrangePatientPrescriptionData(data.result);
      this.prescription = this.prescribedPatientDetails;
      this.prescriptionResource = new DataTableResource(this.prescription);
      this.prescriptionResource.count().then(count => {
        this.precriptionCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_GET_INDIVIDUAL_PRESCRIPTION_BY_ID) {
    }

    if (data.resulttype === RESULT_TYPE_DELETE_PRESCRIPTION) {
      this.hmisApi.getPrescriptionSearch("");
    }

    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }
  }



  private arrangePatientPrescriptionData(result) {
    for (let key in result) {
      // this.prescribedPatientDetails[key]['patient_registration_no'] = this.prescribedPatientDetails[key].hmis_patient_base.patient_registration_no;
      // this.prescribedPatientDetails[key]['patient_blood_type'] = this.prescribedPatientDetails[key].hmis_patient_base.patient_blood_type;
      // this.prescribedPatientDetails[key]['patient_name'] = this.prescribedPatientDetails[key].hmis_patient_base.patient_first_name + ' ' + this.prescribedPatientDetails[key].hmis_patient_base.patient_last_name;
      // var dob = this.prescribedPatientDetails[key].hmis_patient_base.patient_dob === undefined?" ": this.prescribedPatientDetails[key].hmis_patient_base.patient_dob.split("T");
      // this.prescribedPatientDetails[key]['patient_age'] = this.helperFunc.getCalculatedAge(dob[0]);
      // this.prescribedPatientDetails[key]['patient_sex'] = this.prescribedPatientDetails[key].hmis_patient_base.patient_sex;
      // this.prescribedPatientDetails[key]['doctor_name'] = this.prescribedPatientDetails[key].hmis_doctor_master.first_name + ' ' + this.prescribedPatientDetails[key].hmis_doctor_master.last_name;
      var dateOfPrescription = this.prescribedPatientDetails[key]['date'].split("T");
      this.prescribedPatientDetails[key]['date_of_prescription'] = dateOfPrescription[0];
    }
  }

  reloadPrescription(params) {
    this.prescriptionResource.query(params).then(ptypes => this.prescription = ptypes);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

  private ClickEventHandler(eventObj: ActionType, mode, item): void {
    console.log('weljfnukwebiuf', mode)
    switch (mode) {
      case MODE_EDIT:
        this.compLoadManager.redirect(RL_PRESCRIPTION);
        this.state.currentstate = MODE_EDIT;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_EDIT });
        break;
      case MODE_VIEW:
        this.compLoadManager.redirect(RL_PRESCRIPTION);
        this.state.currentstate = MODE_VIEW;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_VIEW });
        break;

      case MODE_DELETE:
        this.hmisApi.deletePrescriptionAsPerId(item.ID);
        this.state.currentstate = MODE_DELETE;
        this.state.stateData = item;
        this.clickHandler.emit(<ActionType>{ data: item, mode: MODE_DELETE });
        break;

      case MODE_OTHERS:
        // this.comonService.createPdfStructure(eventObj.data, "PRESCRIPTION");
        this.createPdfStructureofadmission(eventObj.data, "PRESCRIPTION");

        break;
    }

  }


  private addprescription(): void {
    // this.openCompInAddMode(RL_PRESCRIPTION);
    this.state.currentstate = MODE_ADD;
    this.compLoadManager.redirect(RL_PRESCRIPTION);
  }

  // private createPdfStructure(data:any ): void {
  //  // console.log("prescription Data To be print", eventObj);
  //   var doc = new jsPDF('p', 'pt');
  //   doc.setFontSize(12);

  //   //set header of prescription
  //   var img = new Image;
  //   img.src = "app/images/left_logo.png";
  //   img.crossOrigin = "";

  //   doc.addImage(img.src, 'PNG', 50, 26, 60, 50);
  //   doc.addImage(img.src, 'PNG', 495, 26, 60, 50);

  //   doc.setFont("helvetica");
  //   doc.setFontType("bolduderline");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setFontSize(35);
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(196, 53, 404, 53);
  //   doc.text("JEEVANDEEP", 300, 50, 'center');

  //   doc.setFont("helvetica");
  //   doc.setFontType("italicunderline");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setFontSize(20);
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(115, 73, 490, 73);
  //   doc.text("SPECIAL CARE & DIAGNOSTIC CENTRE", 300, 70, 'center');

  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(134, 0, 0);
  //   doc.setFontSize(10);
  //   doc.text("Bhakuri * P.O. Chakla * P.S.-Berhampore * Dist.- Murshidabad", 290, 90, 'center');

  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(134, 0, 0);
  //   doc.setFontSize(12);
  //   doc.text("Phone: (03482) 224510/224511), 9434229741, 9333311277", 290, 105, 'center');

  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setFontSize(12);
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(45, 225, 550, 225);
  //   doc.text("Registration id : " + data.patient_registration_no, 50, 130, 'left');
  //   doc.text("Name : " + data.patient_name, 50, 145, 'left');
  //   doc.text("Reffered Doctor : " + data.doctor_name, 50, 160, 'left');
  //   doc.text("Age : " + data.patient_age, 50, 175, 'left');
  //   doc.text("Blood group : " + data.patient_blood_type, 50, 190, 'left');
  //   doc.text("Sex : " + data.patient_sex, 50, 205, 'left');
  //   doc.text("Date : " + data.date_of_prescription, 50, 220, 'left');

  //   //Body
  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setFontSize(12);
  //   doc.text("Doctor advice & medication : ", 50, 300, 'left');
  //   doc.text(data.note, 50, 315, 'left');
  //   // doc.text("1. Calpol, 500 mg, 1/day, After meal", 50, 330, 'left');
  //   // doc.text("1. Calpol, 500 mg, 1/day, After meal", 50, 345, 'left');
  //   // doc.text("1. Calpol, 500 mg, 1/day, After meal", 50, 360, 'left');


  //   // signature
  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(40, 700, 180, 700);
  //   doc.text("Concerned Signature", 50, 715, 'left');

  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(31, 132, 0);
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(400, 700, 530, 700);
  //   doc.text("Patient Signature", 500, 715, 'right');

  //   //footer
  //   doc.setLineWidth(1.5);
  //   doc.setDrawColor(31, 132, 0);
  //   doc.line(40, 780, 550, 780);

  //   doc.setFont("helvetica");
  //   doc.setFontType("italic");
  //   doc.setTextColor(134, 0, 0);
  //   doc.setFontSize(10);
  //   doc.text("Jeevandeep Nursing Home * Phone: (03482) 224510/224511), 9434229741, 9333311277", 290, 795, 'center');


  //   doc.save(data.patient_name + '.pdf');
  // }

  ngOnInit() {
    this.compLoadManager.setHeaderTitle('Prescription')

    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      this.isreadonly = true;
    } else {
      this.isreadonly = false;

    }
    //console.log(films);
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

    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(12);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(45, 210, 550, 210);
    doc.text("Registration id : " + data.patient_registration_no, 50, 130, 'left');
    doc.text("Name : " + data.patient_name, 50, 145, 'left');
    doc.text("Reffered Doctor : " + data.doctro_under_name, 50, 160, 'left');
    doc.text("Age : " + data.patient_age, 50, 175, 'left');
    //doc.text("Blood group : " + data.patient_blood_type, 50, 190, 'left');
    doc.text("Sex : " + data.patient_sex, 50, 190, 'left');
    doc.text("Date : " + data.date_of_prescription, 50, 205, 'left');

    //Body
    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setFontSize(12);
    doc.text("Doctor advice & medication : ", 50, 300, 'left');
    doc.text(data.note, 50, 315, 'left');


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
