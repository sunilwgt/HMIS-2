import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Registration, DOB, CompDataInfo, PatientExt } from '../../models/registration';
import { Option, RadioData, GenericPopupOption, RL_REGISTRATION_LIST, RESULT_TYPE_EDIT_PATIENT, RESULT_TYPE_SET_PATIENT, MODE_ADD, RESULT_TYPE_GET_DOCTOR, RESULT_TYPE_GET_STATE_LIST, UPDATE_FIELD_STATE, RL_REGISTER_CONFIRMATION_MODAL, PATIENT_ID_STATE, CUSTOM_COND, INVALID_FIELD, VALID_FIELD, CustomErrorInfo, RESULT_TYPE_DELETE_PATIENT, RESULT_TYPE_UPDATE_PATIENT_EXT, RESULT_TYPE_GET_DOCTOR_LIST, RESULT_TYPE_GET_ALL_DOCTOR_LIST, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_PATIENT_AS_PER_ID_FOR_EXT, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, ActionType, MODE_VIEW, MODE_EDIT, MODE_ADD_WITH_PREVALUES, RESULT_TYPE_GET_IMAGE_REGISTERATION } from '../../models/common';
import { GenericPopup } from '../../generic-components/generic-popup';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';
import { State } from '../../models/state';
import { DoctorOptions } from '../../models/opd';
import { StateListOption } from '../../models/admission';
import { ErrorService } from '../../services/error.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { CompData } from '../../models/compinfo';
import { HelperFunction } from '../../utils/helper-function.service';
import { HmisExternalApisService } from '../../services/hmis-external-apis.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { setTokenSourceMapRange } from 'typescript';
@Component({
  selector: 'hmis-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegistrationComponent extends BaseComponent implements OnInit  {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();

  @ViewChild(GenericPopup)
  private genericPopup: GenericPopup;
  private booleanOptions: Array<RadioData>;
  private genderOptions: Array<RadioData>;
  private bplOption: Array<RadioData>;
  private modaloption: NgbModalOptions;
  private govtIdType: Array<Option>;
  private _updateStateObj: State;
  private _popUpStateObj: State;
  private doctorListOption: Array<Option> = [];
  private ProfessionOption: Array<Option> = [];
  private POption: Array<Option> = [];
private doption:any;

private dataloaded = false;
  
  private stateListOption: Array<StateListOption> = [];
  private patient_state: Array<Option>;
  showNav: any = [];
  private patientId: string;
  private _subscription: Subscription;
  private phoneError: CustomErrorInfo;
  private contactpersonphoneError: CustomErrorInfo;
  private ageError: CustomErrorInfo;
  private customCond: string = CUSTOM_COND;
  private nationalityOption: Array<Option> = [];
  
  private religionOption: Array<Option> = [];
  private hospitaldata;
  private showaddbutton = false;
  private showage: any;

  constructor(baseService: BaseServices, private htppclient: HttpClient, private _errorService: ErrorService, private externalApi: HmisExternalApisService, private el: ElementRef, private helperFunc: HelperFunction
  ) {
    super(baseService);
    this.showNav[0] = true;
    this.defaultvalidation = false;
    //this.hmisApi.getDoctor();
    // this.hmisApi.getDoctorListSearch("");
    this.hmisApi.getDoctorList();
    this.hmisApi.getStateList();
    this.hmisApi.getHospitalSettings("");

  }

  // convertimage(url){
  // let Token = this.hmisApi._hmistoken; 
  //     console.log('token' , Token);
  //     console.log('url' , url);


  //     let headers = new Headers({ "Access-Control-Allow-Origin":'*' ,'Token':Token , "Tenant_Key": "MedicareDb" })
  //     // let headers  =  new Headers({ "Access-Control-Allow-Origin":'*' ,'Token':Token , "Tenant_Key": "MedicareDb" })
  //     // .set("Token", Token)
  //     // .set("Tenant_Key", "MedicareDb")

  //     // headers.append({'Token':Token} )

  //     var options = {
  //       method: 'GET',
  //       headers: headers,
  //       // credentials:"omit"
  //       // mode: 'cors',
  //       // cache: 'default'
  //     };
  // const u = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F67636%2Frose-blue-flower-rose-blooms-67636.jpeg%3Fcs%3Dsrgb%26dl%3Dbeauty-bloom-blue-67636.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeauty%2F&docid=pFs_4Fcq5AgpmM&tbnid=A6JJqffgz3xzlM%3A&vet=10ahUKEwjdxuSx6MThAhXFsJ4KHfcBC6IQMwhqKAAwAA..i&w=4928&h=3264&bih=667&biw=1366&q=image&ved=0ahUKEwjdxuSx6MThAhXFsJ4KHfcBC6IQMwhqKAAwAA&iact=mrc&uact=8https://res.cloudinary.com/demo/image/fetch/w_300,h_300,c_fill,g_face,r_max,f_auto/https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_C%C3%A9sars_2014.jpg"
  //     var request = new Request(u);
  //     console.log('request ' , request);


  //     fetch(request ,options).then((response) => {
  // console.log('fetch image response' , response)
  //     });
  // }
  // convertimage(url){

  //   fetch(url, {
  //     method: 'GET',
  //     // mode: 'no-cors',
  //     headers: ({
  //        'Token':this.hmisApi._hmistoken , "Tenant_Key": "MedicareDb",
  //        'Content-Type':  'image/*',
  //        "Access-Control-Allow-Origin":"*",
  //       //  "Access-Control-Allow-Methods":"*",
  //       //  "Access-Control-Allow-Headers":"*",
  //       //  "Access-Control-Allow-Credentials":"True",

  //       // "allow-credentials": "true"




  //     })
  // })
  // .then((response)=>{
  //   console.log('response' , response)
  // })
  // // .then(blob => {
  // //     var url = window.URL.createObjectURL(blob);
  // //     var a = document.createElement('a');
  // //     a.href = url;
  // //     a.download = "filename.xlsx";
  // //     document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  // //     a.click();    
  // //     a.remove();  //afterwards we remove the element again         
  // // });

  // }

  convertimage(url) {

    this.htppclient.get(url, {
      headers: this.getHeaders(),
      responseType: 'blob'
    }).subscribe((res) => {
      console.log('res', res)
    })

  }
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    ////let token = this.authService.getCurrentToken();
    let token = { Token: this.hmisApi._hmistoken }; // Get this from your auth service.
    if (token) {
      headers.set('Tenant_Key', 'MedicareDb');
      headers.set('Token', token.Token);
      headers.set('Access-Control-Allow-Origin', '*');


    }

    return headers;
  }















  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_PATIENT) {
      this.patientId = data.result;
      console.log('patient registertaion ', data)
      this._popUpStateObj.stateData = this.patientId;
      this.compLoadManager.closePopup();
      this.genericPopup.openPopup(this.compLoadManager.redirect(RL_REGISTER_CONFIRMATION_MODAL, true));
      this.stateService.updateState(this._popUpStateObj);
    }
    if (data.resulttype === RESULT_TYPE_GET_IMAGE_REGISTERATION) {
      console.log('data', data)
      this.convertimage('https://hmismedicarefiles.file.core.windows.net/hmismedicarefiles/a4799f1d-b90d-4a30-bb0d-423fed69b150/download (1).jpg')


    }
    if (data.resulttype === RESULT_TYPE_EDIT_PATIENT) {
      this.compLoadManager.redirect(RL_REGISTRATION_LIST);
      // this.hmisApi.patientSearch("");
      const a = this.comonService.regdateobserver();
      console.log('ewnfwef', a);
      this.hmisApi.patientSearch(a.from, a.to, '');
      this.compLoadManager.closePopup();
    }

    if (data.resulttype === RESULT_TYPE_GET_ALL_DOCTOR_LIST) {

      let selectedfeature:Array<any>  =  []
      
      let intial:any  = [{id: 0,
        indexno: 0,
        label: "Please Select Doctors",
        value: 0}]
      selectedfeature[0] = intial;

      for(let v of data.result){
selectedfeature[0].push(v)
      }

      for (var k in selectedfeature[0]) {
        delete Object.assign(k, {["newKey"]: k["Name"] })["Name"];
    }

        // selectedfeature[0].push(data.result)
        console.log('selectedfeature' , selectedfeature)

        console.log('doctores' , data.result)

        this.doctorListOption = selectedfeature[0];
        this.dataloaded = true;
        // this.ProfessionOption = this.comonService.ProfessionOption;
      // this.ProfessionOption = selectedfeature

      console.log('doctor list option1', this.doctorListOption);

      let doctorListOptions:any= this.comonService.doctorListOptions(data.result);
      // this.doctorListOption.push(doctorListOptions);
      console.log('doctor list option2', this.doctorListOption);
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
    }

    //     if (data.resulttype === RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID) {
    //       this.compData = data.result[0];
    // console.clear();
    //       console.log('compdata' , this.compData);
    //       // this.compData.patient_name = this.compData.patient_first_name + ' ' + this.compData.patient_last_name;
    //       this.updateAllFields();
    //     }
  }

  ngOnInit() {
    const a = this.comonService.getpermissionrole();
    if (a === 'readonly') {
      alert('not alolowed')
      this.compLoadManager.closePopup();
    } else {
      if (this.state.currentstate === MODE_VIEW) {
        // this.externalApi.getregisterationfiles(this.state.stateData.ID)
        this.convertimage('https://hmismedicarefiles.file.core.windows.net/hmismedicarefiles/a4799f1d-b90d-4a30-bb0d-423fed69b150/download (1).jpg')
      }
      // this.hmisApi.getDoctorList();

  //     setTimeout(function(){
  //       let selectedfeature:Array<Option>  = [{id: 0,
  //         indexno: 0,
  //         label: "Please Select Profession",
  //         value: 0}, {label: "Buissness", value: "Buissness", id: 1}]
  //         console.log('se' , selectedfeature ,this.doption);
  // this.doctorListOption = selectedfeature;

  //     },10000);

      this.govtIdType = this.comonService.govtIdType;
      this.bplOption = this.comonService.radioYesNoOptions;
      this.genderOptions = this.comonService.genderOptions;
      this.patient_state = this.comonService.stateOptions;
      this.nationalityOption = this.comonService.nationalityOption;
      this.ProfessionOption = this.comonService.ProfessionOption;

    

console.log('profession option' , this.ProfessionOption)
      this.religionOption = this.comonService.religionOption;
      this.modaloption = new GenericPopupOption();
      this.modaloption.size = "sm";
      this._updateStateObj = this.stateService.createState(UPDATE_FIELD_STATE);
      this._popUpStateObj = this.stateService.createState(PATIENT_ID_STATE);
      this.updateDataForEVMode();
      if (this.state.currentstate === MODE_ADD) {
        this.compData = new Registration();
        let item = { Is_Bpl_holder: false }
        this.state.stateData = item;
        this.compData = item;
        this.state.currentstate = MODE_EDIT
        this.showSubmitBtn = false;
        this.showage = 'Please select Dob'
      }
      if (this.state.currentstate === MODE_EDIT) {
        console.log('mode edit')
        let age = this.getageforedit(this.state.stateData.patient_dob)
      }
    }
  }


  SubmitClickHandler() {
    this.state.currentstate = MODE_ADD;
    this.submitClickHandler();
  }

  invokeAddFunction(): void {
    //this.setExtnData();
    // this.compData.patient_age = "27";
    // this.compData.patient_age_unit = "month";
    //console.log(this.compData);
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
    console.log("compdataadd ", this.compData);
    this.hmisApi.setPatient(this.compData);
  }

  invokeEditFunction(): void {
    //this.setExtnData();
    console.log("compdata1 ", this.compData);
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
    console.log("compdata2", this.compData);

    this.hmisApi.setPatientAsPerId(this.compData.ID, this.compData);

  }

  invokeDeleteFunction(): void {
    //this.setExtnData();
    //this.hmisApi.deletePatientPerId(this.compData.ID,"UserId");
  }

  // private setExtnData(): void {

  //   this.compData.hmis_patient_ext = [];
  //   var patientData: any = { 'patient_profession': this.compData.patient_profession, 'patient_post_office': this.compData.patient_post_office, 'patient_dist': this.compData.patient_dist, 'emergency_person': this.compData.emergency_person, 'emergency_person_contact': this.compData.emergency_person_contact, 'patient_nationality': this.compData.patient_nationality, 'patient_religion': this.compData.patient_religion };
  //   _.forEach(patientData, (value, key) => {
  //     this.compData.hmis_patient_ext.push({ "attribute_name": key, "attribute_value": value });
  //   });
  // }



  // protected valueChangeHandler(evt: CompDataInfo): void {
  //   super.valueChangeHandler(evt);
  //   if (evt.propname === "patient_dob") {
  //     this.compData.patient_age = evt.extraprops.calculatedAge;
  //     this._updateStateObj.currentstate = "patient_age";
  //     this._updateStateObj.stateData = this.compData;
  //     this.stateService.updateState(this._updateStateObj);
  //   }

  // }

  /**
   * Refeence code: how to implement custom validation
   *
   * private lastNameValidation(evntObj:any):void{
     let to:any = {};
     if(!evntObj.newval || evntObj.newval.length > 10){
       to.isErrorShow = true;
       to.fieldStatus = INVALID_FIELD;
       to.data = evntObj;
     }else{
       to.isErrorShow = false;
       to.fieldStatus = VALID_FIELD;
       to.data = evntObj;
     }
     this.lastNameError = to;
   }
   *
   *
   */
  private customPhoneNoCheck(evntObj: any): void {
    console.log(' custom person check', evntObj);

    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please Provide Phone No."
    } else if ((evntObj.newval).toString().length < 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Minimum 10 Digit Required";
    } else if ((evntObj.newval).toString().length > 12) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Maximum 12 Digit Required";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }

    this.phoneError = to;
  }


  contactpersonPhoneNoCheck(evntObj: any): void {
    console.log('contact person checkk', evntObj);
    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please provide phone no."
    } else if ((evntObj.newval).toString().length < 10) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Minimum 10 digit required";
    } else if ((evntObj.newval).toString().length > 12) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Maximum 12 digit required";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }

    this.contactpersonphoneError = to;
  }

  private onErrorOccurFirstTab(evntObj: any): void {
    this.showNav[0] = true;
    this.showNav[1] = false;
  }

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
  }


  private customAgeCheck(evntObj: any): void {
    let to: CustomErrorInfo = new CustomErrorInfo();
    if (!evntObj.newval) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Please Provide Age."
    } else if ((evntObj.newval) < 0) {
      to.isErrorShow = true;
      to.fieldStatus = INVALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "Age Should Be Greater Than 0";
    } else {
      to.isErrorShow = false;
      to.fieldStatus = VALID_FIELD;
      to.data = evntObj;
      to.errorMessage = "";
    }
    this.ageError = to;
  }

  dobChangeHandler(e) {
    this.compData.patient_dob = e.newval;
    if (e.newval === undefined) {
      this.showage = "Please select dob"
      console.log('please hndle dob')

    } else {
      let age = this.helperFunc.getCalculatedAge(e.newval);
      if (age.age === 0) {
        this.showage = age.month + ' Month'
        this.compData.patient_age = this.showage
      } else {
        this.showage = age.age + ' Year';
        this.compData.patient_age = this.showage
      }
    }
  }

  getageforedit(dob) {
    if (dob === undefined) {
      this.showage = "Please select dob"
      console.log('please get dob')
    } else {
      console.log('dob', dob)
      let age = this.helperFunc.getCalculatedAge(dob);
      if (age.age === 0) {
        this.showage = age.month + ' Month'
        this.compData.patient_age = this.showage
      } else {
        this.showage = age.age + ' Year';
        this.compData.patient_age = this.showage
      }
    }

  }

  // private updateAllFields(){
  //   console.log(this.compData);
  //   for (const key in this.compData) {
  //     console.log('keys' , key);
  //     if (this.compData.hasOwnProperty(key)) {
  //       this._updateStateObj.currentstate = key;
  //       this._updateStateObj.stateData = this.compData;
  //       this.stateService.updateState(this._updateStateObj);
  //     }
  //   }
  //   console.log('this.updatestateob' , this._updateStateObj);
  // }

}
