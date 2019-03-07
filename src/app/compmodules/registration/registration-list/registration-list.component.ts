import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource, DataTablePagination } from 'angular5-data-table';
import { Registration } from '../../../models/registration';
import { HelperFunction } from '../../../utils/helper-function.service';
import { ActionType, MODE_EDIT, RL_REGISTRATION, MODE_VIEW, MODE_DELETE, RL_ADMISSION, RESULT_TYPE_GET_PATIENTS, RESULT_TYPE_SET_PATIENT, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_GET_PATIENT_SEARCH, MODE_OTHERS, RESULT_TYPE_GET_DOCTOR_AS_PER_ID, RESULT_TYPE_GET_PATIENT_AS_PER_ID, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RL_REGISTRATION_LIST, RESULT_TYPE_DELETE_PATIENT, MODE_ADMISSION, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RL_PRESCRIPTION } from '../../../models/common';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { UserDetail } from '../../../models/userole';

declare var jsPDF: any;

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
  providers: [
    { provide: 'Window', useValue: window }
  ],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationListComponent extends BaseComponent implements OnInit {

  private patientsResource = new DataTableResource([]);
  private patients = [];
  private patientCount = 0;
  private admissionRL: string = RL_ADMISSION;
  public doctorArray = [];
  public doctorDetailsArray = [];
  public patientDetails = [];
  private singlePatientData = [];
  private _userDetail: UserDetail;
  private DoctorInfo: any;
  private pdfData: any;
  private hospitaldata;

  @ViewChild(DataTable) patientsTable;
  @Inject('Window') private window: Window;

  constructor(baseService: BaseServices, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.hmisApi.patientSearch("");
    this.hmisApi.getHospitalSettings('');
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_PATIENT_SEARCH) {
      this.patients = data.result;
      for (let value of this.patients) {
        var dateOfregistration = value.created_on.split("T");
        value.admitted_on = this.datepipe.transform(dateOfregistration[0], 'dd/MM/yyyy');
      }
      this.patientsResource = new DataTableResource(this.patients);
      this.patientsResource.count().then(count => {
        this.patientCount = count;
      });
    }

    if (data.resulttype === RESULT_TYPE_DELETE_PATIENT) {
      this.hmisApi.patientSearch("");
    }

    if (data.resulttype === RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT) {  
      this.state.stateData = data.result;
      for (let key in data.result.hmis_patient_ext) {
        if (data.result.hmis_patient_ext[key]['attribute_name'] == "patient_profession") {
          data.result.patient_profession = data.result.hmis_patient_ext[key]['attribute_value'];
        } else if (data.result.hmis_patient_ext[key]['attribute_name'] == "emergency_person") {
          data.result.emergency_person = data.result.hmis_patient_ext[key]['attribute_value'];
        } else if (data.result.hmis_patient_ext[key]['attribute_name'] == "emergency_person_contact") {
          data.result.emergency_person_contact = data.result.hmis_patient_ext[key]['attribute_value'];
        } else if (data.result.hmis_patient_ext[key]['attribute_name'] == "patient_dist") {
          data.result.patient_dist = data.result.hmis_patient_ext[key]['attribute_value'];
        } else if (data.result.hmis_patient_ext[key]['attribute_name'] == "patient_post_office") {
          data.result.patient_post_office = data.result.hmis_patient_ext[key]['attribute_value'];
        }
      }
      data.result.patient_age = this.helperFunc.getCalculatedAge(data.result.patient_dob);
      this.compLoadManager.redirect(RL_REGISTRATION);
    }

    if (data.resulttype === RESULT_TYPE_GET_DOCTOR_AS_PER_ID) {
      this.DoctorInfo = data.result.first_name + ' ' + data.result.last_name;
      this.createPdfStructure(this.pdfData);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }
  }

  reloadPatients(params) {
    this.patientsResource.query(params).then(patients => this.patients = patients);
  }


  // special params:
  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };


  private clickEventHandler(eventObj: ActionType): void {
    switch (eventObj.mode) {
      case MODE_EDIT:
      this.compLoadManager.redirect(RL_REGISTRATION);
        // this.hmisApi.getPatientAsPerIdFromEXT(eventObj.data.ID);

        break;

      case MODE_VIEW:
      this.compLoadManager.redirect(RL_REGISTRATION);
        // this.hmisApi.getPatientAsPerIdFromEXT(eventObj.data.ID);
        break;

      case MODE_DELETE:
        this.hmisApi.deletePatientAsPerId(eventObj.data.ID);
        break;

      case MODE_OTHERS:
        this.hmisApi.getDoctorAsPerId(eventObj.data.Reffered_Doctor);
        this.pdfData = eventObj;
        break;
      case MODE_ADMISSION:
        this.hmisApi.getRegisteredPatientById(eventObj.data.ID);
        this.compLoadManager.redirect(RL_ADMISSION);
        break;

      default:
        if (eventObj.atypeId === RL_ADMISSION) {
          this.compLoadManager.redirect(RL_ADMISSION);
        }
        // open admission page
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
    doc.text( this.hospitaldata.hospital_name +  " *Phone:"  + this.hospitaldata.phone_number, 290, 795, 'center');
    doc.save(fileName);

  }
  ngOnInit() {
    //console.log(films);
  }

}
