import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { Subscription } from 'rxjs/Subscription';
import { Building, DoctorOptions, SurguryTypeOptions, OperationTypeOptions } from '../../models/opd';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, RESULT_TYPE_SET_BUILDING, RL_BUILDING_LIST, RadioData, RESULT_TYPE_GET_PATIENT_SEARCH, GET_SELECTED_ITEM, UPDATE_FIELD_STATE, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_SURGERY, RESULT_TYPE_GET_OPERATION_TYPE, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_SET_OPERATION_THEATRE, RESULT_TYPE_GET_OPERATION_TYPE_DROPDOWN, RESULT_TYPE_GET_SURGERY_DROPDOWN, RESULT_TYPE_GET_OPERATION_THEATRE_SEARCH, RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT, RL_OT_LIST, RESULT_TYPE_EDIT_OPERATION_THEATRE, MODE_OT } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { Patient, OtCreate, patientListOption } from '../../models/patient';
import { HelperFunction } from '../../utils/helper-function.service';
import { State } from '../../models/state';
import { CompDataInfo } from '../../models/registration';
import { DatePipe } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { GenericPopup } from '../../generic-components/generic-popup';


@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtComponent extends BaseComponent implements OnInit {
  // @ViewChild(GenericPopup)
  // private genericPopup: GenericPopup;
  private showerror:boolean = true;
  private _tempData: Building;
  private genderOptions: Array<RadioData>;
  private patientlist: Array<ISelectOption> = [];
  private _updateStateObj: State;

  public selectedPatient: Patient = new Patient();
  private doctorListOption: Array<DoctorOptions> = [];
  private surguryTypeListOption: Array<SurguryTypeOptions> = [];
  private operationTypeListOption: Array<OperationTypeOptions> = [];
  private patientList = [];
  private patientData = [];
  private OTModel: OtCreate = new OtCreate();
  private isEnabled: boolean = false;
  private Isdisabled: boolean = false;

  private showsearch: boolean = false;

  showNav: any = [];
 

  constructor(baseService: BaseServices,private _errorService: ErrorService, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.showNav[0] = true;
    // changed this to true for not checking validation
    // this.defaultvalidation = true;
    this.hmisApi.getDoctorList();
    this.hmisApi.getSurgeryDropdown();
    this.hmisApi.getOperationTypeDropdown();
    this.Isdisabled = true;
    this.isEnabled = false;
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ) {
      this.createPatientlistForOT(data.result);
      this.patientData = data.result;
    }

    if (data.resulttype === RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT) {
      this.isEnabled = false;
      for (let value of data.result) {
        this.compData = value;
        this.compData.patient_name = this.compData.patient_first_name + ' ' + this.compData.patient_last_name;
        var patientDob = this.compData.patient_dob === null ? "" : this.compData.patient_dob.split("T");
        this.compData.patient_age = this.helperFunc.getCalculatedAge(patientDob[0]);
      }
    }

    if (data.resulttype === RESULT_TYPE_GET_ALL_DOCTOR_LIST) {
      this.doctorListOption = this.comonService.doctorListOptions(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_SURGERY_DROPDOWN) {
      this.surguryTypeListOption = this.comonService.surguryTypeListOptions(data.result);
    }

    if (data.resulttype === RESULT_TYPE_GET_OPERATION_TYPE_DROPDOWN) {
      this.operationTypeListOption = this.comonService.operationTypeListOptions(data.result);
    }

    if (data.resulttype === RESULT_TYPE_SET_OPERATION_THEATRE) {
      this.compLoadManager.redirect(RL_OT_LIST);
      this.hmisApi.getOperationTheatreListing("");
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_EDIT_OPERATION_THEATRE) {
      this.compLoadManager.redirect(RL_OT_LIST);
      this.hmisApi.getOperationTheatreListing("");
      this.compLoadManager.closePopup();
    }

  }

  private createPatientlistForOT(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.Name;
      dOpt.value = val.Name;
      dOpt.id = val.ID;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.hmisApi.getPatientDetailsForOTOnSearchId(evntObj.data.id);
  }

  private onKeyUpSearchForPatient(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getPatientListForOTWithAdmissionSequence(evntObj.data);
    }
  }

  ngOnInit() {
    if (this.state.currentstate === MODE_OT) {
      this.showsearch = false;
    }
    if (this.state.currentstate === MODE_ADD) {
      this.showsearch = true;
    }
    this.Isdisabled = true;
    this.isEnabled = false;
    this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      this.Isdisabled = false;
      this.isEnabled = false;
      this.compData = new OtCreate();
    }

  }

  invokeAddFunction(): void {
    this.OTModel = this.comonService.arrangeDataForOTModel(this.compData);
    this.hmisApi.setOperationTheatre(this.OTModel);
  }

  invokeEditFunction(): void {
    this.OTModel = this.comonService.arrangeDataForOTModelForUpdate(this.compData);
    this.hmisApi.setOperationTheatreAsPerId(this.compData.operation_id, this.OTModel);
  }


  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }
  date(e) {
    const date = new Date();

    return date;
  }
}
