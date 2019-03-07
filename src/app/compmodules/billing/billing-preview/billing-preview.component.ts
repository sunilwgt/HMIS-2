import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../utils/base.component';
import { BaseServices } from '../../../utils/base.service';
import { HelperFunction } from '../../../utils/helper-function.service';
import { State } from '../../../models/state';
import { DatePipe } from '@angular/common';
import { MODE_EDIT, DISCHARGE, RL_DISCHARGE_CERTIFICATE, MODE_ADD, RESULT_TYPE_SET_BILLING, RESULT_TYPE_SET_EXTERNAL_BILLING, RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST, RESULT_TYPE_SET_PATIENTAPPROVAL } from '../../../models/common';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { PriceListOption } from '../../../models/admission';
import { Packages, BillingDistribution, PatientApproval } from '../../../models/opd';

declare var jsPDF: any;
@Component({
  selector: 'app-billing-preview',
  templateUrl: './billing-preview.component.html',
  styleUrls: ['./billing-preview.component.scss']
})
export class BillingPreviewComponent extends BaseComponent implements OnInit {
  private advanceBilling: any = [];
  private packageDetails: any;
  private billingModel: any;
  private distributionBilling: any;
  private distributionBillings: any = [];
  private patientDetails: any;
  private priceList: Array<ISelectOption> = [];
  private distributionBillingModel: BillingDistribution = new BillingDistribution;
  private individualCharges: any = [];
  private hospitaldata;
  private Patientapproval: PatientApproval = new PatientApproval();

  constructor(baseService: BaseServices, private helperFunc: HelperFunction, public datepipe: DatePipe) {
    super(baseService);
    this.hmisApi.getHospitalSettings("");
  }

  hmisApiSubscribe(data: any): void {
    if (data.resulttype === RESULT_TYPE_SET_BILLING) {
this.setpateintapproval(data.result);
      this.distributionBillingModel = this.comonService.updateBillingDistributionObject(this.individualCharges, this.patientDetails.registration_id, this.patientDetails.admission_id, data.result, this.distributionBillingModel);
      this.distributionBillingModel.created_by = this.hmisApi.userDetail.created_by;
      this.distributionBillingModel.modified_by = this.hmisApi.userDetail.modified_by;
      this.hmisApi.setDistributionBillingData(this.distributionBillingModel)
    }
    if (data.resulttype === RESULT_TYPE_SET_EXTERNAL_BILLING) {
      if (data.result) {
        this.compLoadManager.closePopup();
        this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE);
      }
    }
    if (data.resulttype === RESULT_TYPE_GET_HOSPITAL_DETAIL_LIST) {
      this.hospitaldata = data.result[0];
      console.log('hospital details', this.hospitaldata);
    }
    if (data.resulttype === RESULT_TYPE_SET_PATIENTAPPROVAL) {
      console.log('RESULT_TYPE_SET_PATIENTAPPROVAL', data);
      console.log('RESULT_TYPE_SET_PATIENTAPPROVAL', data);

    }
  }

  ngOnInit() {
    // console.clear();
    console.log('mode ernguer' , this.state.currentstate);
    console.log('compdata pateintdetails', this.state.stateData.compData);
    console.log('billingmodel', this.state.stateData.billingModel);

    if (this.state.currentstate === DISCHARGE || this.state.currentstate === MODE_ADD) {
      var count = 1;
      this.advanceBilling = this.state.stateData.AdvanceBilling;
      this.packageDetails = this.state.stateData.packageBilling;
      this.distributionBillings = this.state.stateData.distributionBilling;
      for (let item of this.distributionBillings) {
        item["id"] = count;
        count++;
      }
      this.patientDetails = this.state.stateData.compData;
      this.billingModel = this.state.stateData.billingModel;
      this.individualCharges = this.state.stateData.individualCharges;
      //  this.distributionBillingModel = this.comonService.updateBillingDistributionObject(this.individualCharges, this.patientDetails.registration_id, this.patientDetails.admission_id, "", this.distributionBillingModel);
      // this.distributionBillingModel.created_by = this.hmisApi.userDetail.created_by;
      // this.distributionBillingModel.modified_by = this.hmisApi.userDetail.modified_by;
      // console.log("stateData",this.state.stateData);

      // console.log("advanceBilling ",this.advanceBilling);
      // console.log("packageDetails",this.packageDetails);
      // console.log("distributionBilling",this.distributionBilling);
      // console.log("patientDetails",this.patientDetails);
      // console.log("billingModel",this.billingModel); 
      // console.log("individualCharges",this.individualCharges);
      // console.log("distributionBillingModel",this.distributionBillingModel);

      // if (this.billingModel.isAdjsut == false) {
      //   this.Patientapproval.admission_id = this.billingModel.admission_id;
      //   this.Patientapproval.approval_status_id = this.billingModel.approvalStatusId;
      //   this.Patientapproval.assigned_to = this.billingModel.ApproverId;
      //   this.Patientapproval.created_by = this.billingModel.created_by;
      //   this.Patientapproval.modified_by = this.billingModel.modified_by;
      //   this.Patientapproval.patient_id = this.billingModel.patient_id;
      //   this.Patientapproval.transaction_id = '';
      //   this.Patientapproval.transaction_type = '';
      // }

    }

    if (this.state.currentstate === MODE_EDIT) {
      var count = 1;
      // console.log("state data in edit mode    ",this.state);
      this.advanceBilling = this.state.stateData.AdvanceBilling;
      this.patientDetails = this.state.stateData.compData;
      this.billingModel = this.state.stateData.billingModel;
      this.distributionBilling = this.state.stateData.distributionBilling;
      if (this.patientDetails.package_id != null) {
        this.packageDetails = new Packages();
        this.packageDetails.label = this.patientDetails.package_name;
        this.packageDetails.others = this.patientDetails.package_amount;
      }

      this.patientDetails.doctro_under_name = this.patientDetails.doctor_name;
      this.createPriceListForDistribution(this.state.stateData.priceList);
      for (let item of this.distributionBillings) {
        item["id"] = count;
        count++;
      }

      // console.log("distribution billing in price list   ", this.distributionBillings);
      console.log("advanceBilling ", this.advanceBilling);
      console.log("packageDetails", this.packageDetails);
      console.log("distributionBilling", this.distributionBilling);
      console.log("patientDetails", this.patientDetails);
      console.log("billingModel", this.billingModel);
    }
    console.log("billingModell", this.billingModel);

    
  }


  exitToBillingList() { }

  saveAndDischargeCertificate() {

    this.createPdfStructure(this.patientDetails);
    // this.state.stateData = this.compData;
    // this.compLoadManager.closePopup();
    // this.compLoadManager.redirect(RL_DISCHARGE_CERTIFICATE);
    if (this.state.currentstate === MODE_EDIT) {
    } else {
      this.hmisApi.setBilling(this.billingModel);
    }
  }

  setpateintapproval(billingid){
    console.log('billing id ' , billingid)
    this.Patientapproval.admission_id = this.billingModel.admission_id;
    this.Patientapproval.approval_status_id = this.billingModel.approvalStatusId;
    this.Patientapproval.assigned_to = this.billingModel.ApproverId;
    this.Patientapproval.created_by = this.billingModel.created_by;
    this.Patientapproval.modified_by = this.billingModel.modified_by;
    this.Patientapproval.patient_id = this.billingModel.patient_id;
    this.Patientapproval.transaction_id = billingid;
    this.Patientapproval.transaction_type = 'Patient Billing';
    console.log('patient approval data ' , this .Patientapproval)

  this.hmisApi.setPatientApproval(this.Patientapproval);
  }


  createPriceListForDistribution(data: any) {
    let arrPrice: Array<ISelectOption> = [];
    var count = 1;
    if (data != undefined) {
      for (let val of data) {
        let dOpt: ISelectOption = new PriceListOption;
        dOpt.label = val.label;
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "actual_cost_ward_medicine") {
          dOpt.value = this.distributionBilling.actual_cost_ward_medicine;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "anaesthetic_machine_gasses_charges") {
          dOpt.value = this.distributionBilling.anaesthetic_machine_gasses_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "anaesthetist_charges") {
          dOpt.value = this.distributionBilling.anaesthetist_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "assistance_charges") {
          dOpt.value = this.distributionBilling.assistance_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "bed_charges") {
          dOpt.value = this.distributionBilling.bed_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "doctor_visit_charges") {
          dOpt.value = this.distributionBilling.doctor_visit_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "dressing_charges") {
          dOpt.value = this.distributionBilling.dressing_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "emergency_management_charges") {
          dOpt.value = this.distributionBilling.emergency_management_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "extra_diet") {
          dOpt.value = this.distributionBilling.extra_diet;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "fluid_surgical_goods_cost") {
          dOpt.value = this.distributionBilling.fluid_surgical_goods_cost;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "investigation_charges") {
          dOpt.value = this.distributionBilling.investigation_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "labour_room_charges") {
          dOpt.value = this.distributionBilling.labour_room_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }

        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "medicine_cost_during_operation") {
          dOpt.value = this.distributionBilling.medicine_cost_during_operation;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "misscellaneous_charges") {
          dOpt.value = this.distributionBilling.misscellaneous_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "nebulization_charges") {
          dOpt.value = this.distributionBilling.nebulization_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "operation_theatre_charges") {
          dOpt.value = this.distributionBilling.operation_theatre_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "oxygen_inhalation_charges") {
          dOpt.value = this.distributionBilling.oxygen_inhalation_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "phototherapy_charges") {
          dOpt.value = this.distributionBilling.phototherapy_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "pulse_oxymeter_charges") {
          dOpt.value = this.distributionBilling.pulse_oxymeter_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "special_nursing_charges") {
          dOpt.value = this.distributionBilling.special_nursing_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "specialist_consultation_charges") {
          dOpt.value = this.distributionBilling.specialist_consultation_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "surgeon_charge") {
          dOpt.value = this.distributionBilling.surgeon_charge;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);
          }
        }
        if (this.comonService.findAndReplace(dOpt.label.toLowerCase(), " ", "_") === "warm_care_charges") {
          dOpt.value = this.distributionBilling.warm_care_charges;
          if (dOpt.value != 0) {
            this.distributionBillings.push(dOpt);

          }
          dOpt.id = val.ID;
          dOpt.others = dOpt.others + count;
          count++;
          arrPrice.push(dOpt);
        }
        this.priceList = arrPrice;
      }
    }
  }



  private createPdfStructure(data) {
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    var yCount = 0;
    var y = 0;

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

    ////////////////////////////////billing Header/////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("InVoice No :", 45, 140, 'left');
    doc.setTextColor(0, 0, 0);
    // doc.text(this.lastInsertedId, 170, 140, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Date :", 450, 140, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.datepipe.transform(new Date(), 'dd/MM/yyyy'), 500, 140, 'left');


    //////////////////////////////////////////////////////////////////////////

    doc.line(45, 150, 550, 150);
    doc.setLineWidth(1.5);
    doc.setFontSize(10);
    doc.setTextColor(134, 0, 0);
    doc.text("Patient's Name :", 45, 165, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_name, 370, 165, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Age :", 45, 180, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text('' + data.patient_age, 370, 180, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Sex :", 45, 195, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_sex, 370, 195, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Bed No :", 45, 210, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.bed_name, 370, 210, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Address :", 45, 225, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_address, 370, 225, 'left');

    // Patients Address
    doc.setTextColor(134, 0, 0);
    doc.text("Admitted On :", 45, 240, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.admitted_on, 370, 240, 'left');
    doc.setTextColor(134, 0, 0);
    doc.text("Contact No :", 45, 255, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(data.patient_phone, 370, 255, 'left');
    doc.line(45, 280, 550, 280);
    doc.setLineWidth(1.5);

    //////////////////////////////Billing Details/////////////////////////////////////
    doc.setTextColor(134, 0, 0);
    doc.text("Package :", 45, 295, 'left');
    doc.setTextColor(0, 0, 0);
    if (this.packageDetails != undefined) {
      doc.text(this.packageDetails.label, 210, 295, 'right');
      doc.text('' + this.packageDetails.others + '.00', 355, 295, 'left');
    } else {
      doc.text(data.package_name != undefined ? data.package_name : " ", 210, 295, 'right');
      if (data.package_amount != undefined) {
        doc.text('' + data.package_amount + '.00', 355, 295, 'left');
      }

    }

    if (this.distributionBillings.length == 0) { y = 345; }

    for (let item of this.distributionBillings) {
      doc.setTextColor(134, 0, 0);
      doc.text(item.label, 45, 320 + yCount, 'left');
      doc.setTextColor(0, 0, 0);
      doc.text('' + item.value + '.00', 380, 320 + yCount, 'right');
      yCount = yCount + 12;
      y = 345 + yCount;
    }

    doc.line(45, y + 2, 550, y + 2);
    doc.setLineWidth(1.5);

    doc.setTextColor(134, 0, 0);
    doc.text("Subtotal :", 45, y + 12, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.billingModel.total_amount.toString(), 380, y + 12, 'right');

    doc.setTextColor(134, 0, 0);
    doc.text("Advance :", 45, y + 22, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.billingModel.advance_amount.toString(), 380, y + 22, 'right');

    doc.setTextColor(134, 0, 0);
    doc.text("Adjust :", 45, y + 32, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text("0.00", 380, y + 32, 'right');

    doc.setTextColor(134, 0, 0);
    doc.text("Due :", 45, y + 42, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.billingModel.total.toString(), 380, y + 42, 'right');

    doc.line(45, y + 52, 550, y + 52);
    doc.setLineWidth(1.5);

    doc.setTextColor(134, 0, 0);
    doc.text("Total :", 45, y + 62, 'left');
    doc.setTextColor(0, 0, 0);
    doc.text(this.billingModel.total_amount.toString(), 380, y + 62, 'right');

    doc.line(45, y + 70, 550, y + 70);
    doc.setLineWidth(1.5);
    //////////////////////////////////////////////////////////////////////////////////

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


    doc.save(data.patient_name + '.pdf');

  }


}
