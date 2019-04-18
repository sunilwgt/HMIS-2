import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Subscription } from 'rxjs/Subscription';
import { Building, DischargeCertificate } from '../../models/opd';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, RESULT_TYPE_SET_BUILDING, RL_BUILDING_LIST, RadioData, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, UPDATE_FIELD_STATE, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, RL_DISCHARGE_CERTIFICATE_LIST, RESULT_TYPE_SET_DISCHARGE_CERTIFICATE, RESULT_TYPE_EDIT_DISCHARGE_CERTIFICATE, RESULT_TYPE_GET_DISCHARGED_IPD_LIST, RESULT_TYPE_GET_DISCHARGED_IPD_PATIENT_DETAILS, DISCHARGE, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE, RESULT_TYPE_GET_ADVANCE_BILLING, RESULT_TYPE_GET_BILLING_LIST, RESULT_TYPE_VALIDATE_BILLING_ADJUSTMENT, MODE_DISCHARGE, RESULT_TYPE_GET_BILLING_LIST_FOR_DISCHARGE } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { patientListOption } from '../../models/patient';
import { HelperFunction } from '../../utils/helper-function.service';
import { DatePipe } from '@angular/common';
import { State } from '../../models/state';
import { Discharge } from '../../models/admission';
declare var jsPDF: any;
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
@Component({
  selector: 'app-discharge-certificate',
  templateUrl: './discharge-certificate.component.html',
  styleUrls: ['./discharge-certificate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DischargeCertificateComponent extends BaseComponent implements OnInit {
  private billingid: string;
  private patientList = [];
  private patientData = [];
  private _updateStateObj: State;
  private dischargeCertificateModel: DischargeCertificate = new DischargeCertificate();
  private isNotEditable: boolean = true;
  private isVisible: boolean = false;
  private hospitaldata;

  constructor(baseService: BaseServices, private helperFunc: HelperFunction,
    private snackbar: MatSnackBar, public datepipe: DatePipe) {
    super(baseService);
    this.hmisApi.getHospitalSettings("");

  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_VALIDATE_BILLING_ADJUSTMENT) {
      console.log('RESULT_TYPE_VALIDATE_BILLING_ADJUSTMENT' , data);
    }
    if (data.resulttype === RESULT_TYPE_GET_DISCHARGED_IPD_LIST) {
      this.createPatientlist(data.result);
      this.patientData = data.result;
      //console.log(this.patientData);
    }
    if (data.resulttype === RESULT_TYPE_GET_DISCHARGED_IPD_PATIENT_DETAILS) {
      this.compData = data.result[0];
      // var dischargeDate =this.compData.discharge_date === undefined?"": this.compData.discharge_date.split("T");
      // this.compData.discharge_date = this.comonService.datepipe.transform(dischargeDate[0],'dd-MM-yyyy');
      var admittedDate = this.compData.date_of_admission === undefined ? "" : this.compData.date_of_admission.split("T");
      this.compData.admitted_on = this.comonService.datepipe.transform(admittedDate[0], 'dd-MM-yyyy');
      this.updateAllFields();
      this.isVisible = true;
      this.hmisApi.getBillingSearch("");
    }
    if (data.resulttype === RESULT_TYPE_GET_BILLING_LIST) {
      console.log('this.compData.patient_admission_id ' , this.compData.patient_admission_id);
      console.log('billing list ' , data.result);
      console.log('compdata ' , this.compData);


      this.billingid = null;
      data.result.forEach(element => {
        if (element.admission_id === this.compData.patient_admission_id) {
          this.billingid = element.ID;
        } else {
          console.log('billing id not found');
        }
      });
      if(this.billingid === null){
        alert("Patient Does not have billing")
        this.snackbar.open('Patient Does not have Billing', 'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
      console.log('billing id ' , this.billingid)
    }
    if (data.resulttype === RESULT_TYPE_GET_BILLING_LIST_FOR_DISCHARGE) {
      this.billingid = null;
      data.result.forEach(element => {
        if (element.admission_id === this.compData.compData.admission_id) {
          this.billingid = element.ID;
        } else {
        }
      });
      console.log('billing id for discharge ' , this.billingid)

    }


    if (data.resulttype === RESULT_TYPE_SET_DISCHARGE_CERTIFICATE) {
      console.log('set discharge certificate' , data);
      this.createPdfStructureadd(this.compData);
      this.hmisApi.getDischargeCertificateList("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE_LIST);
    }
    if (data.resulttype === RESULT_TYPE_EDIT_DISCHARGE_CERTIFICATE) {
      this.hmisApi.getDischargeCertificateList("");
      this.compLoadManager.closePopup();
      this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE_LIST);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }
    if (data.resulttype === RESULT_TYPE_GET_SELECTED_DISCHARGE_CERTIFICATE) {
    }
  }

  private createPatientlist(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      dOpt.others = val;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.hmisApi.getDischargedIPDPatientDetails(evntObj.data.id);
  }

  private updateAllFields() {
    for (const key in this.compData) {
      if (this.compData.hasOwnProperty(key)) {
        this._updateStateObj.currentstate = key;
        this._updateStateObj.stateData = this.compData;
        this.stateService.updateState(this._updateStateObj);
      }
    }
  }

  ngOnInit() {
    console.log('current state' , this.state.currentstate);
    console.log('is not editable' , this.isNotEditable);

    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    if (this.state.currentstate === MODE_ADD) {
      this.updateDataForEVMode();
      console.log('statedata' , this.state.stateData);
      this.compData = new Discharge();
      this.isNotEditable = true;
      console.log('is not editable in add mode' , this.isNotEditable)
    }  if (this.state.currentstate === 'Discharge') {
      this.isNotEditable = false;
      this.compData = this.state.stateData;
      console.log('compdata' , this.state.stateData);
      this.hmisApi.getBillingSearchfordischarge("");
    } if(this.state.currentstate === MODE_EDIT){
      this.compData = this.state.stateData;
      this.isNotEditable = false;
    }
   
  }

  private onKeyUpPatientRegNo(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getDischergedIPDPatientList(evntObj.data);
    }
  }

  protected submitClickHandler() {

    console.log('current state' , this.state.currentstate);
    console.log('compdata' , this.compData);

    if (this.state.currentstate === MODE_ADD) {
      this.dischargeCertificateModel.patient_id = this.compData.patient_registration_id;
      this.dischargeCertificateModel.admission_id = this.compData.patient_admission_id;
      this.dischargeCertificateModel.relationship = this.compData.relationship;
      this.dischargeCertificateModel.final_diagonysis = this.compData.final_diagonysis;
      this.dischargeCertificateModel.advise_on_discharge = this.compData.advise_on_discharge;
      this.dischargeCertificateModel.discharge_note = this.compData.discharge_note;
      this.dischargeCertificateModel.created_by = this.hmisApi.userDetail.created_by;
      this.dischargeCertificateModel.modified_by = this.hmisApi.userDetail.modified_by;
      console.log('dischargecertificate model' , this.dischargeCertificateModel);

      console.log('this.dischargeCertificateModel.patient_id' , this.dischargeCertificateModel.patient_id);
      console.log('this.dischargeCertificateModel.admission_id' , this.dischargeCertificateModel.admission_id);
      console.log('this.billingid' , this.billingid);


      this.hmisApi.ValidateBillingAdjustemnt(this.dischargeCertificateModel.patient_id, this.dischargeCertificateModel.admission_id, this.billingid)//"0d15a6d8-556f-42ba-8043-8faeb8ade666"
      this.hmisApi.setDischargeCertficate(this.dischargeCertificateModel);
      // this.createPdfStructureadd(this.compData);


    }
    if (this.state.currentstate === DISCHARGE) {
      this.dischargeCertificateModel.patient_id = this.compData.compData.registration_id;
      this.dischargeCertificateModel.admission_id = this.compData.compData.admission_id;
      this.dischargeCertificateModel.relationship = this.compData.relationship;
      this.dischargeCertificateModel.final_diagonysis = this.compData.final_diagonysis;
      this.dischargeCertificateModel.advise_on_discharge = this.compData.advise_on_discharge;
      this.dischargeCertificateModel.discharge_note = this.compData.discharge_note;
      this.dischargeCertificateModel.created_by = this.hmisApi.userDetail.created_by;
      this.dischargeCertificateModel.modified_by = this.hmisApi.userDetail.modified_by;
      console.log('dischargecertificate model' , this.dischargeCertificateModel);

      console.log('this.dischargeCertificateModel.patient_id' , this.compData.compData.registration_id);
      console.log('this.dischargeCertificateModel.admission_id' , this.compData.compData.admission_id);
      console.log('this.billingid' , this.billingid);


      this.hmisApi.ValidateBillingAdjustemnt(this.dischargeCertificateModel.patient_id, this.dischargeCertificateModel.admission_id, this.billingid)//"0d15a6d8-556f-42ba-8043-8faeb8ade666"
      // this.createPdfStructuredischarge(this.compData);
      this.hmisApi.setDischargeCertficate(this.dischargeCertificateModel);
    }
    else {
      this.hmisApi.setDischargeCertficateAsPerId(this.compData.ID, this.compData)
    }

  }
  // invokeAddFunction(){
  //   var d = "gjhbdfbjdhb";
  // }
  // invokeEditFunction(){

  // }
  private createPdfStructureadd(data) {
    //console.log(data);
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    var yCount = 0;
    var y = 0;

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
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);

    ////////////////////////////////billing Header/////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Registration No :", 45, 130, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_registration_no, 140, 130, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Date :", 450, 130, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.datepipe.transform(new Date(), 'dd/MM/yyyy'), 490, 130, 'left');


    //////////////////////////////////////////////////////////////////////////

    //Patient Details
    //doc.setTextColor(134, 0, 0);
    //doc.text("Patient Details :", 45, 200, 'left');
    doc.line(45, 135, 550, 135);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.setTextColor(134, 0, 0);
    doc.text("Patient's Name :", 45, 150, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_name, 380, 150, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("S/O, D/O, W/O :", 45, 165, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.relationship, 380, 165, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Age :", 45, 180, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text('' + data.patient_age, 380, 180, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Sex :", 45, 195, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_sex, 380, 195, 'left');
    // doc.setTextColor(134, 0, 0);
    // doc.text("Bed No :", 45, 210, 'left');
    // doc.setTextColor(0, 0, 0);
    // doc.text(data.bed_name, 380, 210, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Address :", 45, 210, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_address, 380, 210, 'left');

    // Patients Address
    doc.setTextColor(134, 0, 0);
    doc.text("Admitted On :", 45, 225, 'left');
    doc.setTextColor(0, 0, 0);
    //var admisionDate = data.date_of_admission === null?"": data.date_of_admission.split("T");
    //data.date_of_admission = this.comonService.datepipe.transform(admisionDate[0],'dd-MM-yyyy');
    doc.text(data.admitted_on, 380, 225, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Contact No :", 45, 240, 'left');
    doc.setTextColor(0, 0, 0);
    // doc.text(data.patient_phone, 380, 255, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Treatment By:", 45, 255, 'left');
    doc.setTextColor(0, 0, 0);
    // doc.text(data.doctro_under_name, 380, 270, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Date Of Discharge:", 45, 270, 'left');
    doc.setTextColor(0, 0, 0);
    if (data.discharge_date != null) {
      doc.text(data.discharge_date, 380, 270, 'left');
    }

    /*  doc.line(45, 290, 550, 290);
     doc.setLineWidth(1.5);*/
    doc.setFontSize(12);
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Final Diagnosis:", 50, 305, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(140, 300, 550, 300);
    doc.setLineWidth(1.5);
    doc.line(45, 390, 550, 390);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    //for()
    doc.text(data.final_diagonysis, 50, 320, 'left');
    /*Horizontal start Line*/
    doc.line(45, 300, 50, 300);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 300, 45, 390);
    doc.setLineWidth(1.5);
    doc.line(550, 300, 550, 390);
    doc.setLineWidth(1.5);

    doc.setFontSize(12);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Operation/Treatment:", 50, 410, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(170, 405, 550, 405);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.text(data.discharge_note, 50, 425, 'left');
    doc.line(45, 500, 550, 500);
    doc.setLineWidth(1.5);
    /*Horizontal start Line*/
    doc.line(45, 405, 50, 405);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 405, 45, 500);
    doc.setLineWidth(1.5);
    doc.line(550, 405, 550, 500);
    doc.setLineWidth(1.5);

    doc.setFontSize(12);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Advice On Discharge:", 50, 520, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(170, 515, 550, 515);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.text(data.advise_on_discharge, 50, 535, 'left');
    doc.line(45, 650, 550, 650);
    doc.setLineWidth(1.5);
    /*Horizontal start Line*/
    doc.line(45, 515, 50, 515);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 515, 45, 650);
    doc.setLineWidth(1.5);
    doc.line(550, 515, 550, 650);
    doc.setLineWidth(1.5);


    // signature
    doc.setTextColor(134, 0, 0);
    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(45, 700, 180, 700);
    doc.text("Concerned Signature", 55, 715, 'left');
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
    doc.text(this.hospitaldata.hospital_name + " *Phone:" + this.hospitaldata.phone_number, 290, 795, 'center');


    doc.save(data.patient_name + '.pdf');

  }



  private createPdfStructuredischarge(data) {
    //console.log(data);
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    var yCount = 0;
    var y = 0;

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
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);

    ////////////////////////////////billing Header/////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Registration No :", 45, 130, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.patient_registration_no, 140, 130, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Date :", 450, 130, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.datepipe.transform(new Date(), 'dd/MM/yyyy'), 490, 130, 'left');


    //////////////////////////////////////////////////////////////////////////

    //Patient Details
    //doc.setTextColor(134, 0, 0);
    //doc.text("Patient Details :", 45, 200, 'left');
    doc.line(45, 135, 550, 135);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.setTextColor(134, 0, 0);
    doc.text("Patient's Name :", 45, 150, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.patient_name, 380, 150, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("S/O, D/O, W/O :", 45, 165, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.relationship, 380, 165, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Age :", 45, 180, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text('' + data.compData.patient_age, 380, 180, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Sex :", 45, 195, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.patient_sex, 380, 195, 'left');
    // doc.setTextColor(134, 0, 0);
    // doc.text("Bed No :", 45, 210, 'left');
    // doc.setTextColor(0, 0, 0);
    // doc.text(data.bed_name, 380, 210, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Address :", 45, 210, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.patient_address, 380, 210, 'left');

    // Patients Address
    doc.setTextColor(134, 0, 0);
    doc.text("Admitted On :", 45, 225, 'left');
    doc.setTextColor(0, 0, 0);
    //var admisionDate = data.date_of_admission === null?"": data.date_of_admission.split("T");
    //data.date_of_admission = this.comonService.datepipe.transform(admisionDate[0],'dd-MM-yyyy');
    doc.text(data.compData.admitted_on, 380, 225, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Contact No :", 45, 240, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.patient_phone, 380, 255, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Treatment By:", 45, 255, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.compData.doctro_under_name, 380, 270, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Date Of Discharge:", 45, 270, 'left');
    doc.setTextColor(0, 0, 0);
    if (data.discharge_date != null) {
      doc.text(data.discharge_date, 380, 270, 'left');
    }

    /*  doc.line(45, 290, 550, 290);
     doc.setLineWidth(1.5);*/
    doc.setFontSize(12);
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Final Diagnosis:", 50, 305, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(140, 300, 550, 300);
    doc.setLineWidth(1.5);
    doc.line(45, 390, 550, 390);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    //for()
    doc.text(data.final_diagonysis, 50, 320, 'left');
    /*Horizontal start Line*/
    doc.line(45, 300, 50, 300);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 300, 45, 390);
    doc.setLineWidth(1.5);
    doc.line(550, 300, 550, 390);
    doc.setLineWidth(1.5);

    doc.setFontSize(12);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Operation/Treatment:", 50, 410, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(170, 405, 550, 405);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.text(data.discharge_note, 50, 425, 'left');
    doc.line(45, 500, 550, 500);
    doc.setLineWidth(1.5);
    /*Horizontal start Line*/
    doc.line(45, 405, 50, 405);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 405, 45, 500);
    doc.setLineWidth(1.5);
    doc.line(550, 405, 550, 500);
    doc.setLineWidth(1.5);

    doc.setFontSize(12);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Advice On Discharge:", 50, 520, 'left');
    doc.setTextColor(0, 0, 0);
    /*Horizontal Line*/
    doc.line(170, 515, 550, 515);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.text(data.advise_on_discharge, 50, 535, 'left');
    doc.line(45, 650, 550, 650);
    doc.setLineWidth(1.5);
    /*Horizontal start Line*/
    doc.line(45, 515, 50, 515);
    doc.setLineWidth(1.5);
    /*Vertical Line*/
    doc.line(45, 515, 45, 650);
    doc.setLineWidth(1.5);
    doc.line(550, 515, 550, 650);
    doc.setLineWidth(1.5);


    // signature
    doc.setTextColor(134, 0, 0);
    doc.setFont("helvetica");
    doc.setFontType("italic");
    doc.setTextColor(31, 132, 0);
    doc.setLineWidth(1.5);
    doc.setDrawColor(31, 132, 0);
    doc.line(45, 700, 180, 700);
    doc.text("Concerned Signature", 55, 715, 'left');
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
    doc.text(this.hospitaldata.hospital_name + " *Phone:" + this.hospitaldata.phone_number, 290, 795, 'center');
    doc.save(data.compData.patient_name + '.pdf');

  }






}
