import { Injectable, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu';
import { ComponentInfo } from '../models/compinfo';
import { ComponentRef } from '../models/compref';
import { ComponentModule } from '../enums/component-module.enum';
import { AdmissionComponent } from '../compmodules/admission/admission.component';
import { RegistrationComponent } from '../compmodules/registration/registration.component';
import { RegistrationListComponent } from '../compmodules/registration/registration-list/registration-list.component';
import { DoctorComponent } from '../compmodules/doctor/doctor.component';
import { DepartmentComponent } from '../compmodules/department/department.component';
import { DepartmentListComponent } from '../compmodules/department/department-list/department-list.component';
import { DepartmentTypeComponent } from '../compmodules/department-type/department-type.component';
import { DepartmentTypeListComponent } from '../compmodules/department-type/department-type-list/department-type-list.component';
import { HospitalDetailsComponent } from '../compmodules/hospital-details/hospital-details.component'
import { LicenceRenewalComponent } from '../compmodules/licence-renewal/licence-renewal.component';
import { LicenceListComponent } from '../compmodules/licence-renewal/licence-list/licence-list.component'


import { BuildingComponent } from '../compmodules/building/building.component';
import { BuildingListComponent } from '../compmodules/building/building-list/building-list.component';
import { FloorComponent } from '../compmodules/floor/floor.component';
import { FloorListComponent } from '../compmodules/floor/floor-list/floor-list.component';
import { WardTypeComponent } from '../compmodules/ward-type/ward-type.component';
import { WardTypeListComponent } from '../compmodules/ward-type/ward-type-list/ward-type-list.component';
import { SurgeryTypeComponent } from '../compmodules/surgery-type/surgery-type.component';
import { SurgeryTypeListComponent } from '../compmodules/surgery-type/surgery-type-list/surgery-type-list.component';
import { AdmissionTypeComponent } from '../compmodules/admission-type/admission-type.component';
import { AdmissionTypeListComponent } from '../compmodules/admission-type/admission-type-list/admission-type-list.component';
import { DischargeTypeComponent } from '../compmodules/discharge-type/discharge-type.component';
import { DischargeTypeListComponent } from '../compmodules/discharge-type/discharge-type-list/discharge-type-list.component';
import { DeliveryTypeComponent } from '../compmodules/delivery-type/delivery-type.component';
import { DeliveryTypeListComponent } from '../compmodules/delivery-type/delivery-type-list/delivery-type-list.component';
import { OperationTypeComponent } from '../compmodules/operation-type/operation-type.component';
import { OperationTypeListComponent } from '../compmodules/operation-type/operation-type-list/operation-type-list.component';
import { PregnantTreatmentComponent } from '../compmodules/pregnant-treatment/pregnant-treatment.component';
import { PregnantTreatmentListComponent } from '../compmodules/pregnant-treatment/pregnant-treatment-list/pregnant-treatment-list.component';
import { VaccineTypeComponent } from '../compmodules/vaccine-type/vaccine-type.component';
import { VaccineTypeListComponent } from '../compmodules/vaccine-type/vaccine-type-list/vaccine-type-list.component'
import { DiseaseTypeComponent } from '../compmodules/disease-type/disease-type.component';
import { DiseaseTypeListComponent } from '../compmodules/disease-type/disease-type-list/disease-type-list.component';
import { PackagesComponent } from '../compmodules/packages/packages.component';
import { PackagesListComponent } from "../compmodules/packages/packages-list/packages-list.component";

import { BillingListComponent } from "../compmodules/billing/billing-list/billing-list.component";
import { BillingComponent } from "../compmodules/billing/billing.component";

import { PriceComponent } from "../compmodules/price/price.component";
import { PricelistComponent } from "../compmodules/price/pricelist/pricelist.component";

import {
  RL_DEPARTMENT, RL_REGISTRATION, RL_REGISTRATION_LIST, RL_ADMISSION, RL_DEPARTMENT_LIST, RL_DOCTOR,
  RL_DEPARTMENT_TYPE_LIST, RL_DEPARTMENT_TYPE, RL_HOSPITAL_DETAILS, RL_LICENCE, RL_LICENCE_LIST, RL_ADMISSION_TYPE,
  RL_ADMISSION_TYPE_List, RL_BUILDING, RL_BUILDING_LIST, RL_DELIVERY_TYPE, RL_DELIVERY_TYPE_LIST, RL_DISCHARGE_TYPE,
  RL_DISCHARGE_TYPE_LIST, RL_FLOOR, RL_FLOOR_LIST, RL_OPERATION_TYPE, RL_OPERATION_TYPE_LIST, RL_PREGNANT_TREATMENT,
  RL_PREGNANT_TREATMENT_LIST, RL_SURGERY_TYPE, RL_SURGERY_TYPE_LIST, RL_VACCINE_TYPE, RL_VACCINE_TYPE_LIST,
  RL_WARD_TYPE, RL_WARD_TYPE_LIST, RL_REGISTER_CONFIRMATION_MODAL, RL_DISEASE_TYPE, RL_DISEASE_LIST,
  RL_DOCUMENT_REPOSITORY, RL_PACKAGES_TYPE, RL_PACKAGES_LIST, RL_ADMISSION_LIST, RL_BILLING, RL_BILLING_LIST,
  RL_PRESCRIPTION_LIST, RL_PRESCRIPTION, RL_WARD_TYPE_MODAL, RL_FORGET_PASSWORD_MODAL, RL_OT, RL_OT_LIST,
  RL_DISCHARGE_CERTIFICATE, RL_DISCHARGE_CERTIFICATE_LIST, RL_SAVE_MESSAGE_MODAL, RL_HOSPITAL_DETAILS_LIST,
  RL_DOCTOR_LIST, RL_WARD_LIST, RL_WARD, RL_BED_LIST, RL_OT_TYPE_LIST, RL_BED, RL_OT_TYPE, RL_NEW_BORN_LIST,
  RL_NEW_BORN, RL_ADMISSION_CONFIRMATION_MODAL, RL_PRICE, RL_PRICE_LIST, RL_DELETE_CONFIRMATION_MODAL, RL_DISCHARGE_MODAL, RL_BILLING_PREVIEW, RL_APPROVER, RL_APPROVER_LIST, RL_APPROVAL, RL_APPROVAL_LIST, RL_APPROVAL_DASHBOARD, RL_APPROVAL_DASHBOARD_LIST, RL_APPROVED_LIST

} from '../models/common';
import { ConfirmationModal } from '../compmodules/registration/confirmation-modal.component';
import { DocrepoComponent } from '../compmodules/docrepo/docrepo.component';
import { DashboardComponent } from '../compmodules/dashboard/dashboard.component';
import { AdmissionListComponent } from '../compmodules/admission/admission-list/admission-list.component';
import { WardTypeModal } from '../compmodules/ward-type/word-type-popup/ward-type-popup.component';
import { PrescriptionComponent } from '../compmodules/prescription/prescription.component';
import { PrescriptionListComponent } from '../compmodules/prescription/prescription-list/prescription-list.component';
import { BedModal } from '../compmodules/bed-type-popup/bed-popup.component';
import { ForgetPasswordModal } from '../compmodules/forget-password-popup/forget-password.component';
//import { RL_PACKAGES_TYPE } from '../models/common';
import { OtListComponent } from '../compmodules/ot/ot-list/ot-list.component';
import { OtComponent } from '../compmodules/ot/ot.component';
import { DischargeCertificateComponent } from '../compmodules/discharge-certificate/discharge-certificate.component';
import { DischargeCertificateListComponent } from '../compmodules/discharge-certificate/discharge-certificate-list/discharge-certificate-list.component';
import { SaveMessageModal } from '../compmodules/save-message-popup/save-message.component';
import { HospitalDetailsListComponent } from '../compmodules/hospital-details/hospital-details-list/hospital-details-list.component';
import { DoctorListComponent } from '../compmodules/doctor/doctor-list/doctor-list.component';
import { WardComponent } from '../compmodules/ward/ward.component';
import { WardListComponent } from '../compmodules/ward/ward-list/ward-list.component';
import { BedComponent } from '../compmodules/bed/bed.component';
import { OttypeComponent } from '../compmodules/ottype/ottype.component';
import { BedListComponent } from '../compmodules/bed/bed-list/bed-list.component';
import { OttypeListComponent } from '../compmodules/ottype/ottype-list/ottype-list.component';
import { NewBornComponent } from '../compmodules/new-born/new-born.component';
import { NewBornListComponent } from '../compmodules/new-born/new-born-list/new-born-list.component';
import { AdmissionConfirmationModal } from '../compmodules/admission/admission-confirmation-modal.component';
import { HmisAuthService } from './hmis-auth.service';
import { GenericActionModal } from '../generic-components/generic-action-modal.component';
import { DischargeModalComponent } from '../compmodules/discharge-modal/discharge-modal.component';
import { BillingPreviewComponent } from '../compmodules/billing/billing-preview/billing-preview.component';
import { ApproverComponent } from '../compmodules/approver/approver.component';
import { ApproverListComponent } from '../compmodules/approver/approver-list/approver-list.component';
import { ApprovalComponent } from '../compmodules/Approval/approval.component';
import { ApprovalListComponent } from '../compmodules/Approval/approval-list/approval-list.component';
import { ApprovedComponent } from '../compmodules/Approved/approved.component';
import { ApprovedListComponent } from '../compmodules/Approved/approved-list/approved-list.component';
import { ApprovalDashboardListComponent } from '../compmodules/ApprovalDashboard/approvaldashboard-list/approvaldashboard-list.component';
import { ApprovalDashboardComponent } from '../compmodules/ApprovalDashboard/approvaldashboard.component';
// import { ApprovalDashboardComponent } from '../compmodules/Approval-dashboard/approval-dashboard.component';

@Injectable()
export class MenuService implements OnInit {
  user_role: any;

  constructor(public HmisAuthService: HmisAuthService) {

    this.HmisAuthService.getloginvalue.subscribe(
      (data: any) => {

        this.user_role = data.Roles[0].role_name;
      });
  }



  ngOnInit() {

  }




  public getPopupMenuItems(): Array<ComponentInfo> {
    return [
      {
        compName: ComponentModule[ComponentModule.DepartmentModule],
        compId: ComponentModule.DepartmentModule,
        comp: new ComponentRef(DepartmentComponent),
        routeLink: RL_DEPARTMENT,
        headerTitle: "Department"
      },
      {
        compName: ComponentModule[ComponentModule.DepartmentTypeModule],
        compId: ComponentModule.DepartmentTypeModule,
        comp: new ComponentRef(DepartmentTypeComponent),
        routeLink: RL_DEPARTMENT_TYPE,
        headerTitle: "Department Type"
      },
      {
        compName: ComponentModule[ComponentModule.Licencemodule],
        compId: ComponentModule.Licencemodule,
        comp: new ComponentRef(LicenceRenewalComponent),
        routeLink: RL_LICENCE
      },
      {
        compName: ComponentModule[ComponentModule.BuildingModule],
        compId: ComponentModule.BuildingModule,
        comp: new ComponentRef(BuildingComponent),
        routeLink: RL_BUILDING,
        headerTitle: "Building"
      },
     
      {
        compName: ComponentModule[ComponentModule.ConfirmationModal],
        compId: ComponentModule.ConfirmationModal,
        comp: new ComponentRef(ConfirmationModal),
        routeLink: RL_REGISTER_CONFIRMATION_MODAL,
        headerTitle: "Thank you for registration with us"
      },
      {
        compName: ComponentModule[ComponentModule.DiseaseTypeModule],
        compId: ComponentModule.DiseaseTypeModule,
        comp: new ComponentRef(DiseaseTypeComponent),
        routeLink: RL_DISEASE_TYPE,
        headerTitle: "Disease Type"
      },
      {
        compName: ComponentModule[ComponentModule.FloorModule],
        compId: ComponentModule.FloorModule,
        comp: new ComponentRef(FloorComponent),
        routeLink: RL_FLOOR,
        headerTitle: "Floor"
      },
      {
        compName: ComponentModule[ComponentModule.WardTypeModule],
        compId: ComponentModule.WardTypeModule,
        comp: new ComponentRef(WardTypeComponent),
        routeLink: RL_WARD_TYPE,
        headerTitle: "Ward Type"
      },
      {
        compName: ComponentModule[ComponentModule.SurgeryTypeModule],
        compId: ComponentModule.SurgeryTypeModule,
        comp: new ComponentRef(SurgeryTypeComponent),
        routeLink: RL_SURGERY_TYPE,
        headerTitle: "Surgery Type"
      },
      {
        compName: ComponentModule[ComponentModule.AdmissionTypeModule],
        compId: ComponentModule.AdmissionTypeModule,
        comp: new ComponentRef(AdmissionTypeComponent),
        routeLink: RL_ADMISSION_TYPE,
        headerTitle: "Admission Type"
      },
      {
        compName: ComponentModule[ComponentModule.DischargeTypeModule],
        compId: ComponentModule.DischargeTypeModule,
        comp: new ComponentRef(DischargeTypeComponent),
        routeLink: RL_DISCHARGE_TYPE,
        headerTitle: "Discharge Type"
      },
      {
        compName: ComponentModule[ComponentModule.DeliveryTypeModule],
        compId: ComponentModule.DeliveryTypeModule,
        comp: new ComponentRef(DeliveryTypeComponent),
        routeLink: RL_DELIVERY_TYPE,
        headerTitle: "Delivery Type"
      },
      {
        compName: ComponentModule[ComponentModule.OperationTypeModule],
        compId: ComponentModule.OperationTypeModule,
        comp: new ComponentRef(OperationTypeComponent),
        routeLink: RL_OPERATION_TYPE,
        headerTitle: "Operation Type"
      },
      {
        compName: ComponentModule[ComponentModule.PregnantTreatmentModule],
        compId: ComponentModule.PregnantTreatmentModule,
        comp: new ComponentRef(PregnantTreatmentComponent),
        routeLink: RL_PREGNANT_TREATMENT,
        headerTitle: "Pregnant Treatment"
      },
      {
        compName: ComponentModule[ComponentModule.PackagesModule],
        compId: ComponentModule.PackagesModule,
        comp: new ComponentRef(PackagesComponent),
        routeLink: RL_PACKAGES_TYPE,
        headerTitle: "Package list"
      },
      {
        compName: ComponentModule[ComponentModule.AdmissionModule],
        compId: ComponentModule.AdmissionModule,
        comp: new ComponentRef(AdmissionComponent),
        routeLink: RL_ADMISSION,
        headerTitle: "new admission"
      },
      {
        compName: ComponentModule[ComponentModule.WardTypeModal],
        compId: ComponentModule.WardTypeModal,
        comp: new ComponentRef(WardTypeModal),
        routeLink: RL_WARD_TYPE_MODAL,
        headerTitle: "Select Ward"
      },
      {
        compName: ComponentModule[ComponentModule.BillingModule],
        compId: ComponentModule.BillingModule,
        comp: new ComponentRef(BillingComponent),
        routeLink: RL_BILLING,
        headerTitle: "Billing"
      },
      {
        compName: ComponentModule[ComponentModule.ApprovalModule],
        compId: ComponentModule.ApprovalModule,
        comp: new ComponentRef(ApprovalComponent),
        routeLink: RL_APPROVAL,
        headerTitle: "Approval Status"
      },
      
      {
        compName: ComponentModule[ComponentModule.PackagesModule],
        compId: ComponentModule.PackagesModule,
        comp: new ComponentRef(PackagesComponent),
        routeLink: RL_PACKAGES_TYPE,
        headerTitle: "Packages"
      },
      {
        compName: ComponentModule[ComponentModule.PrescriptionModule],
        compId: ComponentModule.PrescriptionModule,
        comp: new ComponentRef(PrescriptionComponent),
        routeLink: RL_PRESCRIPTION,
        headerTitle: "Prescription"
      },
      {
        compName: ComponentModule[ComponentModule.BedModal],
        compId: ComponentModule.BedModal,
        comp: new ComponentRef(BedModal),
        routeLink: RL_WARD_TYPE_MODAL,
        headerTitle: "Select Bed"
      },
      {
        compName: ComponentModule[ComponentModule.OtModule],
        compId: ComponentModule.OtModule,
        comp: new ComponentRef(OtComponent),
        routeLink: RL_OT,
        headerTitle: "OT"
      },
      {
        compName: ComponentModule[ComponentModule.ForgetPasswordModal],
        compId: ComponentModule.ForgetPasswordModal,
        comp: new ComponentRef(ForgetPasswordModal),
        routeLink: RL_FORGET_PASSWORD_MODAL,
        headerTitle: "Email ID"
      },
      {
        compName: ComponentModule[ComponentModule.DischargeCertificateModule],
        compId: ComponentModule.DischargeCertificateModule,
        comp: new ComponentRef(DischargeCertificateComponent),
        routeLink: RL_DISCHARGE_CERTIFICATE,
        headerTitle: "Discharge certificate"
      },
      {
        compName: ComponentModule[ComponentModule.SaveMessageModal],
        compId: ComponentModule.SaveMessageModal,
        comp: new ComponentRef(SaveMessageModal),
        routeLink: RL_SAVE_MESSAGE_MODAL,
        headerTitle: "Info"
      },
      {
        compName: ComponentModule[ComponentModule.HospitalDetailsModule],
        compId: ComponentModule.HospitalDetailsModule,
        comp: new ComponentRef(HospitalDetailsComponent),
        routeLink: RL_HOSPITAL_DETAILS,
        headerTitle: "Hospital Settings"
      },
      {
        compName: ComponentModule[ComponentModule.DoctorModule],
        compId: ComponentModule.DoctorModule,
        comp: new ComponentRef(DoctorComponent),
        routeLink: RL_DOCTOR,
        headerTitle: "Doctor"
      },
      {
        compName: ComponentModule[ComponentModule.WardModule],
        compId: ComponentModule.WardModule,
        comp: new ComponentRef(WardComponent),
        routeLink: RL_WARD,
        headerTitle: "Ward"
      },
      {
        compName: ComponentModule[ComponentModule.VaccineTypeModule],
        compId: ComponentModule.VaccineTypeModule,
        comp: new ComponentRef(VaccineTypeComponent),
        routeLink: RL_VACCINE_TYPE,
        headerTitle: "Vaccine"
      },
      {
        compName: ComponentModule[ComponentModule.BedModule],
        compId: ComponentModule.BedModule,
        comp: new ComponentRef(BedComponent),
        routeLink: RL_BED,
        headerTitle: "Bed"
      },
      {
        compName: ComponentModule[ComponentModule.OtTypeModule],
        compId: ComponentModule.OtTypeModule,
        comp: new ComponentRef(OttypeComponent),
        routeLink: RL_OT_TYPE,
        headerTitle: "OT Type"
      },
      {
        compName: ComponentModule[ComponentModule.NewBornModule],
        compId: ComponentModule.NewBornModule,
        comp: new ComponentRef(NewBornComponent),
        routeLink: RL_NEW_BORN,
        headerTitle: "New Born"
      },
      {
        compName: ComponentModule[ComponentModule.AdmissionConfirmationModal],
        compId: ComponentModule.AdmissionConfirmationModal,
        comp: new ComponentRef(AdmissionConfirmationModal),
        routeLink: RL_ADMISSION_CONFIRMATION_MODAL,
        headerTitle: "Admitted Successfully"
      },
      {
        compName: ComponentModule[ComponentModule.PriceModule],
        compId: ComponentModule.PriceModule,
        comp: new ComponentRef(PriceComponent),
        routeLink: RL_PRICE,
        headerTitle: "Price"
      },
      {
        compName: ComponentModule[ComponentModule.PriceListModule],
        compId: ComponentModule.PriceListModule,
        comp: new ComponentRef(PricelistComponent),
        routeLink: RL_PRICE_LIST,
        headerTitle: "Price List"
      },
      {
        compName: ComponentModule[ComponentModule.GenericActionModal],
        compId: ComponentModule.GenericActionModal,
        comp: new ComponentRef(GenericActionModal),
        routeLink: RL_DELETE_CONFIRMATION_MODAL,
        headerTitle: "Confirmation"
      },
      {
        compName: ComponentModule[ComponentModule.DischargeModalModule],
        compId: ComponentModule.DischargeModalModule,
        comp: new ComponentRef(DischargeModalComponent),
        routeLink: RL_DISCHARGE_MODAL,
        headerTitle: "Discharge Information"
      },
      {
        compName: ComponentModule[ComponentModule.BillingPreviewModule],
        compId: ComponentModule.BillingPreviewModule,
        comp: new ComponentRef(BillingPreviewComponent),
        routeLink: RL_BILLING_PREVIEW,
        headerTitle: "Billing Information"
      },
      {
        compName: ComponentModule[ComponentModule.ApproverModule],
        compId: ComponentModule.ApproverModule,
        comp: new ComponentRef(ApproverComponent),
        routeLink: RL_APPROVER,
        headerTitle: "Approve"
      },


      {
        compName: ComponentModule[ComponentModule.ApprovalDashboardModule],
        compId: ComponentModule.ApprovalDashboardModule,
        comp: new ComponentRef(ApprovalDashboardComponent),
        routeLink: RL_APPROVAL_DASHBOARD,
        headerTitle: "Approval Dashboard"
      },
    ]
  }

  getMenuItem(): Array<MenuItem> {
    console.log('user_role', this.user_role);
    if (this.user_role === 'Staff') {
      return [
        {
          name: "Dashboard", menuid: 1, hasPermission: true,
          hasSubmenu: false, hasSubmenuPermission: true, iconClass: "dashboard", compInfo: this.getCompInfoAsPerId(ComponentModule.DashboardComponent)
        },
        {
          name: "Out-Patient Department", menuid: 3, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "out-patient", submenus: [
            { name: "Prescription", menuid: 3.1, compInfo: this.getCompInfoAsPerId(ComponentModule.PrescriptionListModule), routeLink: RL_PRESCRIPTION_LIST }
          ]
        }
        // {
        //   name: "In-patient department", menuid: 4, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "in-patient", submenus: [
        //     {
        //       name: "Admission", menuid: 4.1,
        //       compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionModule), isPopup: true, routeLink: RL_ADMISSION
        //     },
        //     {
        //       name: "Patients", menuid: 4.2, compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionListModule), routeLink: RL_ADMISSION_LIST
        //     },
        //     {
        //       name: "New Born", menuid: 4.3, compInfo: this.getCompInfoAsPerId(ComponentModule.NewBornListModule), routeLink: RL_NEW_BORN_LIST
        //     },
        //     {
        //       name: "OT", menuid: 4.4, compInfo: this.getCompInfoAsPerId(ComponentModule.OtListModule), routeLink: RL_OT
        //     },
        //     {
        //       name: "Discharge Certificate", menuid: 4.5, compInfo: this.getCompInfoAsPerId(ComponentModule.DischargeCertificateListModule), routeLink: RL_DISCHARGE_CERTIFICATE_LIST
        //     },
        //   ]
        // },
        // {
        //   name: "Billing", menuid: 7, hasPermission: true, iconClass: "billing", compInfo: this.getCompInfoAsPerId(ComponentModule.BillingListModule), routeLink: RL_BILLING_LIST
        // }
      ]
    }

    else if (this.user_role === 'Front Desk User') {
      return [
        {
          name: "Dashboard", menuid: 1, hasPermission: true,
          hasSubmenu: false, hasSubmenuPermission: true, iconClass: "dashboard", compInfo: this.getCompInfoAsPerId(ComponentModule.DashboardComponent)
        },
        {
          name: "Frontdesk", menuid: 2, hasPermission: true,
          hasSubmenu: true, hasSubmenuPermission: true, iconClass: "frontdesk", submenus: [
            {
              name: "Patient Registration", menuid: 2.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.RegistrationModule),
              isPopup: true, routeLink: RL_REGISTRATION
            },
        

            {
              name: "Registration List", menuid: 2.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.RegistrationListComponent), routeLink: RL_REGISTRATION_LIST
            }
          ]
        },
        {
          name: "Out-Patient Department", menuid: 3, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "out-patient", submenus: [
            { name: "Prescription", menuid: 3.1, compInfo: this.getCompInfoAsPerId(ComponentModule.PrescriptionListModule), routeLink: RL_PRESCRIPTION_LIST }
          ]
        },
        {
          name: "In-patient department", menuid: 4, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "in-patient", submenus: [
            {
              name: "Admission", menuid: 4.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionModule), isPopup: true, routeLink: RL_ADMISSION
            },
            {
              name: "Patients", menuid: 4.2, compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionListModule), routeLink: RL_ADMISSION_LIST
            },
            {
              name: "New Born", menuid: 4.3, compInfo: this.getCompInfoAsPerId(ComponentModule.NewBornListModule), routeLink: RL_NEW_BORN_LIST
            },
            {
              name: "OT", menuid: 4.4, compInfo: this.getCompInfoAsPerId(ComponentModule.OtListModule), routeLink: RL_OT
            },
            {
              name: "Discharge Certificate", menuid: 4.5, compInfo: this.getCompInfoAsPerId(ComponentModule.DischargeCertificateListModule), routeLink: RL_DISCHARGE_CERTIFICATE_LIST
            },
          ]
        },
        {
          name: "Billing", menuid: 7, hasPermission: true, iconClass: "billing", compInfo: this.getCompInfoAsPerId(ComponentModule.BillingListModule), routeLink: RL_BILLING_LIST
        },

        {
          name: "Approval Dashboard", menuid: 10, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "in-patient", submenus: [
        
            {
              name: "Approved", menuid: 10.1, compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovedListModule), routeLink: RL_APPROVED_LIST
            },
            {
              name: "Approval Dashboard List", menuid: 10.2, compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovalDashboardListModule), routeLink: RL_APPROVAL_DASHBOARD_LIST
            },
          ]
        },
        
      ]
    }

    else {
      return [
        {
          name: "Dashboard", menuid: 1, hasPermission: true,
          hasSubmenu: false, hasSubmenuPermission: true, iconClass: "dashboard", compInfo: this.getCompInfoAsPerId(ComponentModule.DashboardComponent)
        },


        {
          name: "Frontdesk", menuid: 2, hasPermission: true,
          hasSubmenu: true, hasSubmenuPermission: true, iconClass: "frontdesk", submenus: [
            {
              name: "Patient Registration", menuid: 2.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.RegistrationModule),
              isPopup: true, routeLink: RL_REGISTRATION
            },
            {
              name: "Registration List", menuid: 2.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.RegistrationListComponent), routeLink: RL_REGISTRATION_LIST
            }
          ]
        },
        {
          name: "Out-Patient Department", menuid: 3, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "out-patient", submenus: [
            { name: "Prescription", menuid: 3.1, compInfo: this.getCompInfoAsPerId(ComponentModule.PrescriptionListModule), routeLink: RL_PRESCRIPTION_LIST }
          ]
        },
        {
          name: "In-patient department", menuid: 4, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "in-patient", submenus: [
            {
              name: "Admission", menuid: 4.1,
              compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionModule), isPopup: true, routeLink: RL_ADMISSION
            },
            {
              name: "Patients", menuid: 4.2, compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionListModule), routeLink: RL_ADMISSION_LIST
            },
            {
              name: "New Born", menuid: 4.3, compInfo: this.getCompInfoAsPerId(ComponentModule.NewBornListModule), routeLink: RL_NEW_BORN_LIST
            },
            {
              name: "OT", menuid: 4.4, compInfo: this.getCompInfoAsPerId(ComponentModule.OtListModule), routeLink: RL_OT
            },
            {
              name: "Discharge Certificate", menuid: 4.5, compInfo: this.getCompInfoAsPerId(ComponentModule.DischargeCertificateListModule), routeLink: RL_DISCHARGE_CERTIFICATE_LIST
            },
          ]
        },
        {
          name: "Document Repository", menuid: 5, hasPermission: true, iconClass: "document-repo", compInfo: this.getCompInfoAsPerId(ComponentModule.DocumentRepository), isPopup: true, routeLink: RL_DOCUMENT_REPOSITORY
        },
        {
          name: "Users", menuid: 6, hasPermission: true, iconClass: "user"
        },
        {
          name: "Billing", menuid: 7, hasPermission: true, iconClass: "billing", compInfo: this.getCompInfoAsPerId(ComponentModule.BillingListModule), routeLink: RL_BILLING_LIST
        },
       
        {
          name: "Settings", menuid: 8, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "settings", submenus: [
            {
              name: "Hospital", menuid: 8.1, hasSubmenu: true,
              submenus: [
                { name: "Hospital Settings", menuid: 8.11, compInfo: this.getCompInfoAsPerId(ComponentModule.HospitalDetailsModule), isPopup: true, routeLink: RL_HOSPITAL_DETAILS },
                { name: "Licence Renewal", menuid: 8.12, compInfo: this.getCompInfoAsPerId(ComponentModule.LicenceListModule), routeLink: RL_LICENCE_LIST }
              ]
            },
            {
              name: "OPD", menuid: 8.2, hasSubmenu: true,
              submenus: [
                { name: "Disease Type", menuid: 8.21, compInfo: this.getCompInfoAsPerId(ComponentModule.DiseaseTypeListModule), routeLink: RL_DISEASE_LIST },
                { name: "Department Type", menuid: 8.22, compInfo: this.getCompInfoAsPerId(ComponentModule.DepartmentTypeListModule), routeLink: RL_DEPARTMENT_TYPE_LIST },
                { name: "Department", menuid: 8.23, compInfo: this.getCompInfoAsPerId(ComponentModule.DepartmentListModule), routeLink: RL_DEPARTMENT_LIST },
                { name: "Doctor", menuid: 8.24, compInfo: this.getCompInfoAsPerId(ComponentModule.DoctorListModule), routeLink: RL_DOCTOR_LIST }
              ]
            },
            {
              name: "IPD", menuid: 8.3, hasSubmenu: true,
              submenus: [
                { name: "Building", menuid: 8.31, compInfo: this.getCompInfoAsPerId(ComponentModule.BuildingListModule), routeLink: RL_BUILDING_LIST },
                { name: "Floor", menuid: 8.32, compInfo: this.getCompInfoAsPerId(ComponentModule.FloorListModule), routeLink: RL_FLOOR_LIST },
                { name: "Ward Type", menuid: 8.33, compInfo: this.getCompInfoAsPerId(ComponentModule.WardTypeListModule), routeLink: RL_WARD_TYPE_LIST },
                { name: "Ward", menuid: 8.34, compInfo: this.getCompInfoAsPerId(ComponentModule.WardListModule), routeLink: RL_WARD_LIST },
                { name: "Bed", menuid: 8.35, compInfo: this.getCompInfoAsPerId(ComponentModule.BedListModule), routeLink: RL_BED_LIST },
                //{ name: "OT", menuid: 8.36, compInfo: this.getCompInfoAsPerId(ComponentModule.OtTypeListModule), routeLink: RL_OT_TYPE_LIST },
                { name: "Surgery Type", menuid: 8.37, compInfo: this.getCompInfoAsPerId(ComponentModule.SurgeryTypeListModule), routeLink: RL_SURGERY_TYPE_LIST },
                { name: "Admission Type", menuid: 8.38, compInfo: this.getCompInfoAsPerId(ComponentModule.AdmissionTypeListModule), routeLink: RL_ADMISSION_TYPE_List },
                { name: "Discharge Type", menuid: 8.39, compInfo: this.getCompInfoAsPerId(ComponentModule.DischargeTypeListModule), routeLink: RL_DISCHARGE_TYPE_LIST },
                { name: "Delivery type", menuid: 8.40, compInfo: this.getCompInfoAsPerId(ComponentModule.DeliveryTypeListModule), routeLink: RL_DELIVERY_TYPE_LIST },
                { name: "Operation Type", menuid: 8.41, compInfo: this.getCompInfoAsPerId(ComponentModule.OperationTypeListModule), routeLink: RL_OPERATION_TYPE_LIST },
                { name: "Pregnant Treatment", menuid: 8.42, compInfo: this.getCompInfoAsPerId(ComponentModule.PregnantTreatmentListModule), routeLink: RL_PREGNANT_TREATMENT_LIST },
                { name: "Vaccine type", menuid: 8.43, compInfo: this.getCompInfoAsPerId(ComponentModule.VaccineTypeListModule), routeLink: RL_VACCINE_TYPE_LIST },
                /* { name: "Packages", menuid: 8.44, compInfo: this.getCompInfoAsPerId(ComponentModule.PackagesListModule), routeLink: RL_PACKAGES_LIST },
                { name: "Price", menuid: 8.45, compInfo: this.getCompInfoAsPerId(ComponentModule.PriceListModule), routeLink: RL_PRICE_LIST } */
                { name: "Approver master", menuid: 8.44, compInfo: this.getCompInfoAsPerId(ComponentModule.ApproverListModule), routeLink: RL_APPROVER_LIST },
                {
                  name: "Approval Status master", menuid: 9, hasPermission: true, iconClass: "billing", compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovalListModule), routeLink: RL_APPROVAL_LIST
                },
              ]
            },
            {
              name: "Billing", menuid: 8.4, hasSubmenu: true,
              submenus: [
                { name: "Packages", menuid: 8.41, compInfo: this.getCompInfoAsPerId(ComponentModule.PackagesListModule), routeLink: RL_PACKAGES_LIST },
                { name: "Price", menuid: 8.42, compInfo: this.getCompInfoAsPerId(ComponentModule.PriceListModule), routeLink: RL_PRICE_LIST }
              ]
            },
          ]
        },
        // {
        //   name: "Approval Status", menuid: 9, hasPermission: true, iconClass: "billing", compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovalListModule), routeLink: RL_APPROVAL_LIST
        // },
        {
          name: "Approval Dashboard", menuid: 10, hasPermission: true, hasSubmenu: true, hasSubmenuPermission: true, iconClass: "in-patient", submenus: [
        
            {
              name: "Approved", menuid: 10.1, compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovedListModule), routeLink: RL_APPROVED_LIST
            },
            {
              name: "Approval Dashboard List", menuid: 10.2, compInfo: this.getCompInfoAsPerId(ComponentModule.ApprovalDashboardListModule), routeLink: RL_APPROVAL_DASHBOARD_LIST
            },
          ]
        },
      ]
    }

  }

  private getCompInfoAsPerId(compRefId: number): ComponentInfo {
    let tempcinfo: ComponentInfo;
        console.log('compRefId' , compRefId );

    for (let v of this.getCompList()) {

      if (v.compId === compRefId) {
        // console.log('compId' , v.compId );
        // console.log('compRefId' , compRefId );
        
        tempcinfo = v;
        break;
      }
    }

    return tempcinfo;
  }




  private getCompList(): Array<ComponentInfo> {
    return [
      {
        compName: ComponentModule[ComponentModule.RegistrationModule],
        compId: ComponentModule.RegistrationModule,
        comp: new ComponentRef(RegistrationComponent),
        headerTitle: "Patient Registration"
      },

      // {
      //   compName: ComponentModule[ComponentModule.ApprovalDashboardModule],
      //   compId: ComponentModule.ApprovalDashboardModule,
      //   comp: new ComponentRef(ApprovalDashboardComponent),
      //   headerTitle: "Approval DashboardModule"
      // },
      {
        compName: ComponentModule[ComponentModule.AdmissionModule],
        compId: ComponentModule.AdmissionModule,
        comp: new ComponentRef(AdmissionComponent),
        headerTitle: "Admission"
      },
      {
        compName: ComponentModule[ComponentModule.AdmissionListModule],
        compId: ComponentModule.AdmissionListModule,
        comp: new ComponentRef(AdmissionListComponent),
        headerTitle: "Admission"
      },
      {
        compName: ComponentModule[ComponentModule.RegistrationListComponent],
        compId: ComponentModule.RegistrationListComponent,
        comp: new ComponentRef(RegistrationListComponent),
        headerTitle: "Patient Registration List"
      },
      {
        compName: ComponentModule[ComponentModule.DoctorModule],
        compId: ComponentModule.DoctorModule,
        comp: new ComponentRef(DoctorComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DepartmentListModule],
        compId: ComponentModule.DepartmentListModule,
        comp: new ComponentRef(DepartmentListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DepartmentTypeListModule],
        compId: ComponentModule.DepartmentTypeListModule,
        comp: new ComponentRef(DepartmentTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.HospitalDetailsModule],
        compId: ComponentModule.HospitalDetailsModule,
        comp: new ComponentRef(HospitalDetailsComponent),
        headerTitle: "Hospital Details"
      },
      {
        compName: ComponentModule[ComponentModule.Licencemodule],
        compId: ComponentModule.Licencemodule,
        comp: new ComponentRef(LicenceRenewalComponent)
      },
      {
        compName: ComponentModule[ComponentModule.LicenceListModule],
        compId: ComponentModule.LicenceListModule,
        comp: new ComponentRef(LicenceListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.BuildingModule],
        compId: ComponentModule.BuildingModule,
        comp: new ComponentRef(BuildingListComponent)
      },
      
      {
        compName: ComponentModule[ComponentModule.BuildingListModule],
        compId: ComponentModule.BuildingListModule,
        comp: new ComponentRef(BuildingListComponent)
      },



      



      {
        compName: ComponentModule[ComponentModule.FloorModule],
        compId: ComponentModule.FloorModule,
        comp: new ComponentRef(FloorComponent)
      },
      {
        compName: ComponentModule[ComponentModule.FloorListModule],
        compId: ComponentModule.FloorListModule,
        comp: new ComponentRef(FloorListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.WardTypeModule],
        compId: ComponentModule.WardTypeModule,
        comp: new ComponentRef(WardTypeComponent)
      },
      {
        compName: ComponentModule[ComponentModule.WardTypeListModule],
        compId: ComponentModule.WardTypeListModule,
        comp: new ComponentRef(WardTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.SurgeryTypeModule],
        compId: ComponentModule.SurgeryTypeModule,
        comp: new ComponentRef(SurgeryTypeComponent)
      },
      {
        compName: ComponentModule[ComponentModule.SurgeryTypeListModule],
        compId: ComponentModule.SurgeryTypeListModule,
        comp: new ComponentRef(SurgeryTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.AdmissionTypeListModule],
        compId: ComponentModule.AdmissionTypeListModule,
        comp: new ComponentRef(AdmissionTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DischargeTypeListModule],
        compId: ComponentModule.DischargeTypeListModule,
        comp: new ComponentRef(DischargeTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DiseaseTypeModule],
        compId: ComponentModule.DiseaseTypeModule,
        comp: new ComponentRef(DiseaseTypeComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DiseaseTypeListModule],
        compId: ComponentModule.DiseaseTypeListModule,
        comp: new ComponentRef(DiseaseTypeListComponent),
        headerTitle: "Disease List"
      },
      {
        compName: ComponentModule[ComponentModule.DeliveryTypeListModule],
        compId: ComponentModule.DeliveryTypeListModule,
        comp: new ComponentRef(DeliveryTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.OperationTypeListModule],
        compId: ComponentModule.OperationTypeListModule,
        comp: new ComponentRef(OperationTypeListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.PregnantTreatmentListModule],
        compId: ComponentModule.PregnantTreatmentListModule,
        comp: new ComponentRef(PregnantTreatmentListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.DocumentRepository],
        compId: ComponentModule.DocumentRepository,
        comp: new ComponentRef(DocrepoComponent)
      },
      {
        compName: ComponentModule[ComponentModule.PackagesListModule],
        compId: ComponentModule.PackagesListModule,
        comp: new ComponentRef(PackagesListComponent),
        headerTitle: "Packages List"
      },
      {
        compName: ComponentModule[ComponentModule.DashboardComponent],
        compId: ComponentModule.DashboardComponent,
        comp: new ComponentRef(DashboardComponent)
      },
      {
        compName: ComponentModule[ComponentModule.BillingListModule],
        compId: ComponentModule.BillingListModule,
        comp: new ComponentRef(BillingListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.ApprovalListModule],
        compId: ComponentModule.ApprovalListModule,
        comp: new ComponentRef(ApprovalListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.PackagesListModule],
        compId: ComponentModule.PackagesListModule,
        comp: new ComponentRef(PackagesListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.PrescriptionListModule],
        compId: ComponentModule.PrescriptionListModule,
        comp: new ComponentRef(PrescriptionListComponent)
      },
      {
        compName: ComponentModule[ComponentModule.OtListModule],
        compId: ComponentModule.OtListModule,
        comp: new ComponentRef(OtListComponent),
        headerTitle: "OT List"
      },
      {
        compName: ComponentModule[ComponentModule.DischargeCertificateListModule],
        compId: ComponentModule.DischargeCertificateListModule,
        comp: new ComponentRef(DischargeCertificateListComponent),
        headerTitle: "Discharge certificate list"
      },

      {
        compName: ComponentModule[ComponentModule.HospitalDetailsListModule],
        compId: ComponentModule.HospitalDetailsListModule,
        comp: new ComponentRef(HospitalDetailsListComponent),
        headerTitle: "Hospitals List"
      },
      {
        compName: ComponentModule[ComponentModule.DoctorListModule],
        compId: ComponentModule.DoctorListModule,
        comp: new ComponentRef(DoctorListComponent),
        headerTitle: "Doctors List"
      },
      {
        compName: ComponentModule[ComponentModule.WardListModule],
        compId: ComponentModule.WardListModule,
        comp: new ComponentRef(WardListComponent),
        headerTitle: "Ward List"
      },
      {
        compName: ComponentModule[ComponentModule.VaccineTypeListModule],
        compId: ComponentModule.VaccineTypeListModule,
        comp: new ComponentRef(VaccineTypeListComponent),
        headerTitle: "Vaccine List"
      },
      {
        compName: ComponentModule[ComponentModule.BedListModule],
        compId: ComponentModule.BedListModule,
        comp: new ComponentRef(BedListComponent),
        headerTitle: "Bed List"
      },
      {
        compName: ComponentModule[ComponentModule.OtTypeListModule],
        compId: ComponentModule.OtTypeListModule,
        comp: new ComponentRef(OttypeListComponent),
        headerTitle: "OT Type List"
      },
      {
        compName: ComponentModule[ComponentModule.NewBornListModule],
        compId: ComponentModule.NewBornListModule,
        comp: new ComponentRef(NewBornListComponent),
        headerTitle: "New Born List"
      },
      {
        compName: ComponentModule[ComponentModule.NewBornListModule],
        compId: ComponentModule.NewBornListModule,
        comp: new ComponentRef(NewBornListComponent),
        headerTitle: "New Born List"
      },
      {
        compName: ComponentModule[ComponentModule.PriceListModule],
        compId: ComponentModule.PriceListModule,
        comp: new ComponentRef(PricelistComponent),
        headerTitle: "Price List"
      },
      {
        compName: ComponentModule[ComponentModule.ApproverModule],
        compId: ComponentModule.ApproverModule,
        comp: new ComponentRef(ApproverComponent)
      },

      {
        compName: ComponentModule[ComponentModule.ApprovalDashboardModule],
        compId: ComponentModule.ApprovalDashboardModule,
        comp: new ComponentRef(ApprovalDashboardComponent)
      },
      
      {
        compName: ComponentModule[ComponentModule.ApproverListModule],
        compId: ComponentModule.ApproverListModule,
        comp: new ComponentRef(ApproverListComponent),
        headerTitle: "Approver List"
      },

      {
        compName: ComponentModule[ComponentModule.ApprovedListModule],
        compId: ComponentModule.ApprovedListModule,
        comp: new ComponentRef(ApprovedListComponent),
        headerTitle: "Approved List"
      },

      {
        compName: ComponentModule[ComponentModule.ApprovalDashboardListModule],
        compId: ComponentModule.ApprovalDashboardListModule,
        comp: new ComponentRef(ApprovalDashboardListComponent),
        headerTitle: "Approval dashboard List"
      },

    ]
  }

}

