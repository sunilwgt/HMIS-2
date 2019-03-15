import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { GenericCompType } from '../../enums/generic-comp-type.enum';
import { MODE_ADD, MODE_EDIT, MODE_VIEW, PackageOption, RESULT_TYPE_GET_ADMITTED_PATIENT_LIST, RESULT_TYPE_GET_PATIENT_SEARCH, UPDATE_FIELD_STATE, RESULT_TYPE_GET_PACKAGE_LIST, RESULT_TYPE_GET_PRICE_LIST, RESULT_TYPE_SET_ADVANCE_BILLING, RESULT_TYPE_SET_BILLING, RL_BILLING, RL_BILLING_LIST, RESULT_TYPE_GET_ADVANCE_BILLING, RESULT_TYPE_GET_ADMITTED_PATIENT_DETAILS_AS_PER_ID, RadioData, RESULT_TYPE_GET_BILLING_LIST, ADMISSION_MODAL_ID_STATE, Option, RESULT_TYPE_EDIT_BILLING, RESULT_TYPE_GET_SELECTED_PATIENT_BY_ID, RESULT_TYPE_GET_REGISTERED_REG_NO, RESULT_TYPE_GET_OPERATION_THEATRE_BY_ADMISSION_SEQ, RESULT_TYPE_GET_PATIENT_DETAILS_FOR_OT, RESULT_TYPE_SET_EXTERNAL_BILLING, RESULT_TYPE_GET_DISCHARGED_PATIENT_LIST, RESULT_TYPE_GET_DISCHARGED_PATIENT_DETAILS, RESULT_TYPE_GET_EXTERNAL_BILLING, RESULT_TYPE_EDIT_EXTERNAL_BILLING, DISCHARGE, RL_BILLING_PREVIEW, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_GET_ACTION_FOR_APPROVER, RESULT_TYPE_SET_APPROVAL, RL_APPROVAL_LIST, RESULT_TYPE_UPDATEAPPROVAL_LIST } from '../../models/common';
import { BaseComponent } from '../../utils/base.component';
import { BaseServices } from '../../utils/base.service';
import { ISelectOption } from '../../interfaces/ISelectOption';
import { patientListOption } from '../../models/patient';
import { concat } from 'rxjs/operators';
import { HelperFunction } from '../../utils/helper-function.service';
import { State } from '../../models/state';
import { PackageListOption, billingModel, PriceListOption, advanceBillingModel } from '../../models/admission';
import { DatePipe } from '@angular/common';
import { Billing, BillingDistribution, BillSummery, ApprovalModal } from '../../models/opd';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

declare var jsPDF: any;

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ApprovalComponent extends BaseComponent implements OnInit {
  ActionList = [];
  newval = '';
  total_bill: number = 0;
  default_amount: number = 0;
  due: number = 0;
  private finalAmount: number = 0;
  private patientList = [];
  private patientData: any;
  private IsAdjust: boolean = false;
  private _updateStateObj: State;
  private packageSearchList: Array<ISelectOption> = [];
  private priceList: Array<ISelectOption> = [];
  showNav: any = [];
  private tabIndex: number = 0;
  private totalAdvance: number = 0;
  private amountInWords: string = "Zero";
  private individualCharges: any = [];
  private packageAmount: any;
  private lastInsertedId: string;
  private Isdisabled: boolean = false;
  private individualChargesEditable = true;
  private showPckagedtails: boolean = false;
  private lastInsertedAdvanceId: string;
  private patientBillingId: string;
  private admissionId: string;
  private invoice_number: string;
  private packageId: string;
  private patientInformation: any;
  private distributionBillData: any;
  private priceData: any;
  private priceCount: number = 0;
  private IndividualPrices: any = [];
  private billSummery: BillSummery = new BillSummery;
  private isEnabled: boolean = false;

  current_date: any = Date.now();
  private advanceBillingData: advanceBillingModel = new advanceBillingModel;
  private distributionBillingModel: BillingDistribution = new BillingDistribution;
  private ApprovalModel: ApprovalModal = new ApprovalModal;

  private BillingModel: Billing = new Billing();
  private item = [];
  private paymentMode: Array<Option>;
  private totalDistributionBillingAmount: number = 0;
  private hospitaldata;
  constructor(baseService: BaseServices, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.showNav[0] = true;
    // this.hmisApi.getPriceSearch("");
    this.hmisApi.getHospitalSettings("");
    this.hmisApi.getActionsforapprover();


  }

  hmisApiSubscribe(data: any): void {

    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
      // console.log('hospital details', this.hospitaldata);
    }
    if (data.resulttype === RESULT_TYPE_GET_ACTION_FOR_APPROVER) {
      // this.hospitaldata = data.result[0];
      // console.log('RESULT_TYPE_GET_ACTION_FOR_APPROVER details', data);
      this.ActionList = data.result;
    }

    if (data.resulttype === RESULT_TYPE_SET_APPROVAL) {
      // this.hospitaldata = data.result[0];
      // console.log('Approval set result', data.result[0]);

      this.compLoadManager.redirect(RL_APPROVAL_LIST);
      this.hmisApi.getApprovalSearch("");
      this.compLoadManager.closePopup();

    }

    if (data.resulttype === RESULT_TYPE_UPDATEAPPROVAL_LIST) {
      // console.log('Approval update result', data);

      this.compLoadManager.redirect(RL_APPROVAL_LIST);
      this.hmisApi.getApprovalSearch("");
      this.compLoadManager.closePopup();

    }
    
  }

  ngOnInit() {
    this.updateDataForEVMode();
    if (this.state.currentstate === MODE_ADD) {
      // console.log('current state ', this.state.currentstate)
      this.compData = new ApprovalModal();
    }
  }


  invokeAddFunction(): void {
    // console.log('add compdata', this.compData);
    // this.hmisApi.setDepartment(this.compData);
  }


  private createPatientlist(data: any): void {
    let arrPatient: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new patientListOption();
      dOpt.label = val.admission_sequence;
      dOpt.value = val.admission_sequence;
      dOpt.id = val.admission_id;
      dOpt.others = val;
      arrPatient.push(dOpt);
    }
    this.patientList = arrPatient;
  }

  private createPackageList(data: any): void {
    let arrPackage: Array<ISelectOption> = [];
    for (let val of data) {
      let dOpt: ISelectOption = new PackageListOption;
      dOpt.label = val.package_name;
      dOpt.value = val.package_name;
      dOpt.id = val.ID;
      dOpt.others = val.package_amount;
      arrPackage.push(dOpt);
    }
    this.packageSearchList = arrPackage;
  }

  private createPriceList(data: any): void {
    let arrPrice: Array<ISelectOption> = [];
    var count = 1;
    for (let val of data) {
      let dOpt: ISelectOption = new PriceListOption;
      dOpt.label = val.price_title;
      dOpt.value = val.price;
      dOpt.id = val.ID;
      dOpt.others = dOpt.others + count;
      count++;
      arrPrice.push(dOpt);
    }
    this.priceList = arrPrice;
    if (this.billSummery != undefined) {
      this.billSummery.priceList = this.priceList;

    }

  }


  getSelectedHandlerForPackage(evntObj: any): void {
    this.compData.package_id = evntObj.data.id;
    this.compData.package_amount = evntObj.data.others;
    this.total_bill = Number(this.compData.package_amount)
    // if(Number(this.total_bill > Number(this.totalAdvance))){
    //   this.due = this.total_bill - this.totalAdvance
    // }
    this.finalAmount = this.total_bill;
    this.finalAmount = this.finalAmount == 0 ? 0 : this.finalAmount - this.totalAdvance;
    this.packageAmount = {
      name: evntObj.data.label,
      amount: Number(this.compData.package_amount == undefined ? 0 : this.compData.package_amount)
    }
    this.amountInWords = this.comonService.convertNumberToWords(this.finalAmount);
    // console.log('line 225', this.amountInWords);
    this.total_bill;
    this.individualChargesEditable = false;
    this.billSummery.packageBilling = evntObj.data;
  }

  getSelectedIsAdjustValue(evnt: any): void {
    this.IsAdjust = evnt.target.checked;
    this.compData.IsAdjust = this.IsAdjust;

    // console.log('adjust', this.compData.isAdjust);
    // console.log('compdata', this.compData);
    const createdby = this.compData.created_by == undefined ? this.hmisApi.userDetail.created_by : this.compData.created_by;
    // console.log('created by', createdby);
  }

  private onKeyUpSearchForPatient(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getDischargePatientList(evntObj.data);
    }
  }

  getSelectedHandlerForPatient(evntObj: any): void {
    this.compData = evntObj.data.others;
    var dischargeDate = this.compData.discharge_date.split("T");
    this.compData.discharge_date = this.datepipe.transform(dischargeDate[0], 'dd-MM-yyyy');
    var admittedDate = this.compData.admission_datetime.split("T");
    this.compData.admitted_on = this.datepipe.transform(admittedDate[0], 'dd-MM-yyyy');
    this.isEnabled = true;
    this.billSummery.compData = this.compData;
    this.updateAllFields();
    this.hmisApi.getAdvanceBillingData(this.compData.registration_id, this.compData.admission_id, "00000000-0000-0000-0000-000000000000");
  }

  private onKeyUpSearchForPackage(evntObj: any): void {
    if (evntObj.data.length > 3) {
      this.hmisApi.getPackageSearch(evntObj.data);
    }
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

  toggleNav(index) {
    this.showNav = [];
    this.showNav[index] = true;
    this.tabIndex = index;
  }

  valueChangeHandler(event) {

    this.newval = event.newval;
    this.compData[event.propname] = event.newval;
    // console.log('compdat', this.compData);
  }

  protected submitClickHandler() {
    if(this.state.currentstate == MODE_EDIT){
      this.ApprovalModel.created_by = this.hmisApi.userDetail.created_by;
      this.ApprovalModel.modified_by = this.hmisApi.userDetail.modified_by;
      this.ApprovalModel.approval_status_type = this.compData.approval_status_type;
      this.ApprovalModel.approval_status_name = this.compData.approval_status_name;
      this.ApprovalModel.ID = this.compData.ID;
      this.ApprovalModel.status = true;
      this.hmisApi.updateApprovalAsPerId(this.ApprovalModel);
    }
     if(this.state.currentstate == MODE_ADD){
      this.ApprovalModel.created_by = this.hmisApi.userDetail.created_by;
      this.ApprovalModel.modified_by = this.hmisApi.userDetail.modified_by;
      this.ApprovalModel.approval_status_type = this.compData.approval_status_type;
      this.ApprovalModel.approval_status_name = this.compData.approval_status_name;
      this.hmisApi.createapproval(this.ApprovalModel);
    }

  }


  // protected submitClickHandler() {
  //   this.BillingModel.admission_id = this.compData.admission_id;
  //   this.BillingModel.patient_id = this.compData.registration_id;
  //   this.BillingModel.package_id = this.compData.package_id === undefined ? this.packageId : this.compData.package_id;
  //   this.BillingModel.total_amount = this.total_bill;
  //   this.BillingModel.total = this.finalAmount;
  //   this.BillingModel.isAdjust = this.compData.IsAdjust;
  //   this.BillingModel.insurance_company_id = "9A2F41F5-D40A-4C98-9B02-015A4B01D75C";
  //   this.BillingModel.created_by = this.compData.created_by == undefined ? this.hmisApi.userDetail.created_by : this.compData.created_by;
  //   this.BillingModel.modified_by = this.compData.modified_by == undefined ? this.hmisApi.userDetail.modified_by : this.compData.modified_by;
  //   this.BillingModel.advance_amount = this.totalAdvance;

  //   if (this.state.currentstate == MODE_EDIT) {
  //     this.BillingModel.ID = this.patientBillingId
  //     this.BillingModel.admission_id = this.patientData.admission_id;
  //     this.BillingModel.patient_id = this.patientData.registration_id;
  //     this.BillingModel["invoice_number"] = this.invoice_number;

  //     this.distributionBillingModel = this.comonService.updateBillingDistributionObject(this.individualCharges, this.patientData.registration_id, this.patientData.admission_id, this.compData.ID, this.distributionBillingModel);
  //     this.distributionBillingModel.created_by = this.hmisApi.userDetail.created_by;
  //     this.distributionBillingModel.modified_by = this.hmisApi.userDetail.modified_by;
  //     this.billSummery.billingModel = this.BillingModel;
  //     this.billSummery.distributionBilling = this.distributionBillingModel
  //     this.billSummery.compData = this.compData;
  //     this.state.stateData = this.billSummery;
  //     // this.compLoadManager.closePopup();
  //     // this.compLoadManager.redirect(RL_BILLING_PREVIEW);

  //   }

  //   else {
  //     console.log('billing model' , this.BillingModel);
  //     this.billSummery.billingModel = this.BillingModel;
  //     this.billSummery.distributionBilling = this.IndividualPrices;
  //     this.billSummery.individualCharges = this.individualCharges;
  //     this.state.stateData = this.billSummery;
  //     this.compLoadManager.closePopup();
  //     this.compLoadManager.redirect(RL_BILLING_PREVIEW);
  //   }
  // }

  updateCharges(evnt) {

    // console.log('enters update charge', evnt.price);
    if (evnt.label != undefined && evnt.price != undefined) {
      let priceModel = {
        label: evnt.label,
        value: evnt.price
      }
      let chargeModel = {
        labelName: this.comonService.findAndReplace(evnt.label.toLowerCase(), " ", "_"),
        value: evnt.price
      }

      this.individualCharges.push(chargeModel);
      this.IndividualPrices.push(priceModel);
      this.total_bill += Number(evnt.price);
      this.finalAmount = this.total_bill - this.totalAdvance;
      // if(Number(this.total_bill > Number(this.totalAdvance))){
      //   this.due = this.total_bill - this.totalAdvance
      // }
    }

    this.amountInWords = this.comonService.convertNumberToWords(this.finalAmount);
    this.total_bill;
    // console.log('pre final amount ', this.finalAmount);
    this.finalAmount = this.total_bill - this.totalAdvance;
    // console.log('post final amount ', this.finalAmount);


  }

  saverange(event) {
    //console.log(event);
  }

  //Advance billing information 
  saveAdvanceData() {
    this.compData.created_by = this.hmisApi.userDetail.created_by;
    this.compData.modified_by = this.hmisApi.userDetail.modified_by;
    this.advanceBillingData = this.comonService.arrangeDataForAdvanceBilling(this.compData);
    this.hmisApi.setAdvanceBillingModel(this.advanceBillingData);
  }

  createPriceListForDistribution(data: any) {
    let arrPrice: Array<ISelectOption> = [];
    var count = 1;
    if (data != undefined) {
      for (let val of data) {
        let dOpt: ISelectOption = new PriceListOption;
        dOpt.label = val.price_title;
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "actual_cost_ward_medicine") {
          dOpt.value = this.distributionBillData.actual_cost_ward_medicine;
          this.distributionBillingModel.actual_cost_ward_medicine = this.distributionBillData.actual_cost_ward_medicine;
          this.totalDistributionBillingAmount += this.distributionBillData.actual_cost_ward_medicine;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "anaesthetic_machine_gasses_charges") {
          dOpt.value = this.distributionBillData.anaesthetic_machine_gasses_charges;
          this.distributionBillingModel.anaesthetic_machine_gasses_charges = this.distributionBillData.anaesthetic_machine_gasses_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.anaesthetic_machine_gasses_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "anaesthetist_charges") {
          dOpt.value = this.distributionBillData.anaesthetist_charges;
          this.distributionBillingModel.anaesthetist_charges = this.distributionBillData.anaesthetist_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.anaesthetist_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "assistance_charges") {
          dOpt.value = this.distributionBillData.assistance_charges;
          this.distributionBillingModel.assistance_charges = this.distributionBillData.assistance_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.assistance_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "bed_charges") {
          dOpt.value = this.distributionBillData.bed_charges;
          this.distributionBillingModel.bed_charges = this.distributionBillData.bed_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.bed_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "doctor_visit_charges") {
          dOpt.value = this.distributionBillData.doctor_visit_charges;
          this.distributionBillingModel.doctor_visit_charges = this.distributionBillData.doctor_visit_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.doctor_visit_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "dressing_charges") {
          dOpt.value = this.distributionBillData.dressing_charges;
          this.distributionBillingModel.dressing_charges = this.distributionBillData.dressing_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.dressing_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "emergency_management_charges") {
          dOpt.value = this.distributionBillData.emergency_management_charges;
          this.distributionBillingModel.emergency_management_charges = this.distributionBillData.emergency_management_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.emergency_management_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "extra_diet") {
          dOpt.value = this.distributionBillData.extra_diet;
          this.distributionBillingModel.extra_diet = this.distributionBillData.extra_diet;
          this.totalDistributionBillingAmount += this.distributionBillData.extra_diet;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "fluid_surgical_goods_cost") {
          dOpt.value = this.distributionBillData.fluid_surgical_goods_cost;
          this.distributionBillingModel.fluid_surgical_goods_cost = this.distributionBillData.fluid_surgical_goods_cost;
          this.totalDistributionBillingAmount += this.distributionBillData.fluid_surgical_goods_cost;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "investigation_charges") {
          dOpt.value = this.distributionBillData.investigation_charges;
          this.distributionBillingModel.investigation_charges = this.distributionBillData.investigation_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.investigation_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "labour_room_charges") {
          dOpt.value = this.distributionBillData.labour_room_charges;
          this.distributionBillingModel.labour_room_charges = this.distributionBillData.labour_room_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.labour_room_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "medicine_cost_during_operation") {
          dOpt.value = this.distributionBillData.medicine_cost_during_operation;
          this.distributionBillingModel.medicine_cost_during_operation = this.distributionBillData.medicine_cost_during_operation;
          this.totalDistributionBillingAmount += this.distributionBillData.medicine_cost_during_operation;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "misscellaneous_charges") {
          dOpt.value = this.distributionBillData.misscellaneous_charges;
          this.distributionBillingModel.misscellaneous_charges = this.distributionBillData.misscellaneous_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.misscellaneous_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "nebulization_charges") {
          dOpt.value = this.distributionBillData.nebulization_charges;
          this.distributionBillingModel.nebulization_charges = this.distributionBillData.nebulization_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.nebulization_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "operation_theatre_charges") {
          dOpt.value = this.distributionBillData.operation_theatre_charges;
          this.distributionBillingModel.operation_theatre_charges = this.distributionBillData.operation_theatre_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.operation_theatre_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "oxygen_inhalation_charges") {
          dOpt.value = this.distributionBillData.oxygen_inhalation_charges;
          this.distributionBillingModel.oxygen_inhalation_charges = this.distributionBillData.oxygen_inhalation_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.oxygen_inhalation_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "phototherapy_charges") {
          dOpt.value = this.distributionBillData.phototherapy_charges;
          this.distributionBillingModel.phototherapy_charges = this.distributionBillData.phototherapy_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.phototherapy_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "pulse_oxymeter_charges") {
          dOpt.value = this.distributionBillData.pulse_oxymeter_charges;
          this.distributionBillingModel.pulse_oxymeter_charges = this.distributionBillData.pulse_oxymeter_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.pulse_oxymeter_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "special_nursing_charges") {
          dOpt.value = this.distributionBillData.special_nursing_charges;
          this.distributionBillingModel.special_nursing_charges = this.distributionBillData.special_nursing_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.special_nursing_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "specialist_consultation_charges") {
          dOpt.value = this.distributionBillData.specialist_consultation_charges;
          this.distributionBillingModel.specialist_consultation_charges = this.distributionBillData.specialist_consultation_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.specialist_consultation_charges;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "surgeon_charge") {
          dOpt.value = this.distributionBillData.surgeon_charge;
          this.distributionBillingModel.surgeon_charge = this.distributionBillData.surgeon_charge;
          this.totalDistributionBillingAmount += this.distributionBillData.surgeon_charge;
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "warm_care_charges") {
          dOpt.value = this.distributionBillData.warm_care_charges;
          this.distributionBillingModel.warm_care_charges = this.distributionBillData.warm_care_charges;
          this.totalDistributionBillingAmount += this.distributionBillData.warm_care_charges;
        }
        // dOpt.value = val.price;
        dOpt.id = val.ID;
        dOpt.others = dOpt.others + count;
        count++;
        arrPrice.push(dOpt);
      }
      this.priceList = arrPrice;
      //return arrPrice;
    }
  }

  private createAdvancBillingPdf(data: any = this.item) {

    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    var yCount = 0;
    var y = 0;
    var amount = 0;

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
    doc.setFontType("normal");
    doc.setTextColor(0, 0, 0);

    doc.line(45, 150, 550, 150);
    doc.setLineWidth(1.5);
    doc.setFontSize(12);
    doc.setTextColor(134, 0, 0);
    doc.text("Patient's Name :", 45, 165, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data[0].patient_name, 370, 165, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Registration No: :", 45, 185, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text('' + data[0].patient_registration_no, 370, 185, 'left');
    doc.line(45, 195, 550, 195);
    doc.setLineWidth(1.5);
    doc.setFontSize(12);
    doc.setTextColor(134, 0, 0);
    doc.text("Paid Date :", 45, 210, 'left');
    doc.text("Paid By :", 200, 210, 'left');
    doc.text("Amount", 370, 210, 'left');
    doc.setTextColor(134, 0, 0);
    doc.line(45, 215, 550, 215);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    for (let item of data) {
      // var date = this.datepipe.transform(item.advanceDate,'dd/MM/yyyy')
      doc.setTextColor(134, 0, 0);
      doc.text(item.advanceDate, 45, 230 + yCount, 'left');
      doc.text(item.advance_paid_by, 200, 230 + yCount, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + item.advance_amount, 395, 230 + yCount, 'right');
      yCount = yCount + 20;
      y = 230 + yCount;
      amount = amount + item.advance_amount;
    }
    y = y - 5;
    doc.line(45, y + 2, 550, y + 2);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.text("TOTAL ", 45, y + 20, 'left');
    doc.text('' + amount, 395, y + 20, 'right');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // signature
    doc.setTextColor(134, 0, 0);
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
    doc.text(this.hospitaldata.hospital_name + " *Phone:" + this.hospitaldata.phone_number, 290, 795, 'center');


    doc.save(data[0].patient_name + '.pdf');
  }

}