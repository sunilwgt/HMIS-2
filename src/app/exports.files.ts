import { DashboardComponent } from "./compmodules/dashboard/dashboard.component";
import { PackagesComponent } from "./compmodules/packages/packages.component";
import { PackagesListComponent } from "./compmodules/packages/packages-list/packages-list.component";
import { DocrepoComponent } from "./compmodules/docrepo/docrepo.component";
import { DiseaseTypeListComponent } from "./compmodules/disease-type/disease-type-list/disease-type-list.component";
import { DiseaseTypeComponent } from "./compmodules/disease-type/disease-type.component";
import { ConfirmationModal } from "./compmodules/registration/confirmation-modal.component";
import { VaccineTypeListComponent } from "./compmodules/vaccine-type/vaccine-type-list/vaccine-type-list.component";
import { VaccineTypeComponent } from "./compmodules/vaccine-type/vaccine-type.component";
import { PregnantTreatmentListComponent } from "./compmodules/pregnant-treatment/pregnant-treatment-list/pregnant-treatment-list.component";
import { PregnantTreatmentComponent } from "./compmodules/pregnant-treatment/pregnant-treatment.component";
import { OperationTypeListComponent } from "./compmodules/operation-type/operation-type-list/operation-type-list.component";
import { OperationTypeComponent } from "./compmodules/operation-type/operation-type.component";
import { DeliveryTypeListComponent } from "./compmodules/delivery-type/delivery-type-list/delivery-type-list.component";
import { DeliveryTypeComponent } from "./compmodules/delivery-type/delivery-type.component";
import { DischargeTypeListComponent } from "./compmodules/discharge-type/discharge-type-list/discharge-type-list.component";
import { DischargeTypeComponent } from "./compmodules/discharge-type/discharge-type.component";
import { AdmissionTypeListComponent } from "./compmodules/admission-type/admission-type-list/admission-type-list.component";
import { AdmissionTypeComponent } from "./compmodules/admission-type/admission-type.component";
import { SurgeryTypeListComponent } from "./compmodules/surgery-type/surgery-type-list/surgery-type-list.component";
import { SurgeryTypeComponent } from "./compmodules/surgery-type/surgery-type.component";
import { WardTypeListComponent } from "./compmodules/ward-type/ward-type-list/ward-type-list.component";
import { WardTypeComponent } from "./compmodules/ward-type/ward-type.component";
import { FloorListComponent } from "./compmodules/floor/floor-list/floor-list.component";
import { FloorComponent } from "./compmodules/floor/floor.component";
import { BuildingListComponent } from "./compmodules/building/building-list/building-list.component";
import { BuildingComponent } from "./compmodules/building/building.component";
import { LicenceListComponent } from "./compmodules/licence-renewal/licence-list/licence-list.component";
import { LicenceRenewalComponent } from "./compmodules/licence-renewal/licence-renewal.component";
import { HospitalDetailsComponent } from "./compmodules/hospital-details/hospital-details.component";
import { DepartmentTypeComponent } from "./compmodules/department-type/department-type.component";
import { DepartmentTypeListComponent } from "./compmodules/department-type/department-type-list/department-type-list.component";
import { DepartmentComponent } from "./compmodules/department/department.component";
import { DepartmentListComponent } from "./compmodules/department/department-list/department-list.component";
import { DoctorComponent } from "./compmodules/doctor/doctor.component";
import { GenericModalContent, GenericPopup } from "./generic-components/generic-popup";
import { RegistrationListComponent } from "./compmodules/registration/registration-list/registration-list.component";
import { AdmissionComponent } from "./compmodules/admission/admission.component";
import { RegistrationComponent } from "./compmodules/registration/registration.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { LeftpanelComponent } from "./leftpanel/leftpanel.component";
import { LeftmenuitemComponent } from "./leftpanel/leftmenuitem/leftmenuitem.component";
import { RightpanelComponent } from "./rightpanel/rightpanel.component";
import { CompMapDirective } from "./directives/comp-map.directive";
import { TemplateMapDirective } from "./directives/id-map.directive";
import { InnerHeaderComponent } from "./inner-header/inner-header.component";
import { PageTitleComponent } from "./rightpanel/page-title/page-title.component";
import { TitleComponent } from "./rightpanel/page-title/title/title.component";
import { BedcrumbComponent } from "./rightpanel/page-title/bedcrumb/bedcrumb.component";
import { VerticalLabelTypeComponent } from "./generic-components/vertical-label-type/vertical-label-type.component";
import { LoaderComponent } from "./loader/loader.component";
import { HeaderButtonsComponent } from "./compmodules/registration/header-buttons/header-buttons.component";
import { PageNotFoundComponent } from "./error/page-not-found/page-not-found.component";
import { ImgcaptureComponent } from "./generic-components/imgcapture/imgcapture.component";
import { SelectedComponent } from "./generic-components/search/selected-items";
import { SearchComponent } from "./generic-components/search/search.component";
import { PackagePipe } from "./pipes/package.pipe";
import { GenericActionComponent } from "./generic-components/generic-action/generic-action.component";
import { DragDropDirective } from "./directives/drag-drop.directive";
import { AppdashboardComponent } from "./appdashboard/appdashboard.component";
import { PatientsummaryComponent } from "./compmodules/dashboard/patientsummary/patientsummary.component";
import { MedicalInsuranceComponent } from "./compmodules/dashboard/medical-insurance/medical-insurance.component";
import { IncomeSummaryComponent } from "./compmodules/dashboard/income-summary/income-summary.component";
import { WardProgressComponent } from "./compmodules/dashboard/ward-progress/ward-progress.component";
import { SessionCheckDirective } from "./directives/sesstion-check.directive";
import { AdmissionListComponent } from "./compmodules/admission/admission-list/admission-list.component";
import { WardTypeModal } from "./compmodules/ward-type/word-type-popup/ward-type-popup.component";
import { WardTypeModalItem } from "./compmodules/ward-type/word-type-popup/word-type-item";
//import { HelperFunction } from "./utils/helper-function.service";

import { BillingListComponent } from "./compmodules/billing/billing-list/billing-list.component";
import { BillingComponent } from "./compmodules/billing/billing.component";
import { PrescriptionListComponent } from "./compmodules/prescription/prescription-list/prescription-list.component";
import { PrescriptionComponent } from './compmodules/prescription/prescription.component';
import { BedModal } from "./compmodules/bed-type-popup/bed-popup.component";
import { BedModalItem } from "./compmodules/bed-type-popup/bed-item";
import { OtComponent } from "./compmodules/ot/ot.component";
import { OtListComponent } from "./compmodules/ot/ot-list/ot-list.component";
import { ForgetPasswordModal } from "./compmodules/forget-password-popup/forget-password.component";
import { DischargeCertificateComponent } from './compmodules/discharge-certificate/discharge-certificate.component';
import { DischargeCertificateListComponent } from "./compmodules/discharge-certificate/discharge-certificate-list/discharge-certificate-list.component";
import { SaveMessageModal } from "./compmodules/save-message-popup/save-message.component";
import { HospitalDetailsListComponent } from "./compmodules/hospital-details/hospital-details-list/hospital-details-list.component";
import { DoctorListComponent } from "./compmodules/doctor/doctor-list/doctor-list.component";
import { WardListComponent } from "./compmodules/ward/ward-list/ward-list.component";
import { WardComponent } from "./compmodules/ward/ward.component";
import { BedComponent } from "./compmodules/bed/bed.component";
import { BedListComponent } from "./compmodules/bed/bed-list/bed-list.component";
import { OttypeComponent } from "./compmodules/ottype/ottype.component";
import { OttypeListComponent } from "./compmodules/ottype/ottype-list/ottype-list.component";
import { IconListComponent } from "./compmodules/icon-list/icon-list.component";
import { NewBornComponent } from "./compmodules/new-born/new-born.component";
import { NewBornListComponent } from "./compmodules/new-born/new-born-list/new-born-list.component";
import { AdmissionConfirmationModal } from "./compmodules/admission/admission-confirmation-modal.component";
import { KeyupSearchComponent } from "./generic-components/search/keyup-search/keyup-search.component";
import { PriceComponent } from "./compmodules/price/price.component";
import { PricelistComponent } from "./compmodules/price/pricelist/pricelist.component";
import { BillingPreviewComponent } from "./compmodules/billing/billing-preview/billing-preview.component";
import { GenericActionModal } from "./generic-components/generic-action-modal.component";
import { DischargeModalComponent } from "./compmodules/discharge-modal/discharge-modal.component";
import { HeaderButtonPrescriptionComponent } from "./compmodules/prescription/header-button-prescription/header-button-prescription.component";
import { NewRegisterationButtonComponent } from "./compmodules/admission/Newregisteration-button/Newregisteration-button.component";
import { hospitaltitleComponent } from "./rightpanel/page-title/hospitaltitle/hospitaltitle.component";
import { ApproverComponent } from "./compmodules/approver/approver.component";
import { ApproverListComponent } from "./compmodules/approver/approver-list/approver-list.component";
import { ApprovalComponent } from "./compmodules/Approval/approval.component";
import { ApprovalListComponent } from "./compmodules/Approval/approval-list/approval-list.component";
import { ApprovedListComponent } from "./compmodules/Approved/approved-list/approved-list.component";
import { ApprovalDashboardListComponent } from "./compmodules/ApprovalDashboard/approvaldashboard-list/approvaldashboard-list.component";
import { ApprovalDashboardComponent } from "./compmodules/ApprovalDashboard/approvaldashboard.component";
import { ApprovalChartComponent } from "./compmodules/dashboard/approval-chart/approval-chart.component";

export const DECLARATION_COMPONENTS = [
  ApproverListComponent,
  ApproverComponent,

  ApprovalDashboardComponent,
  AppComponent,
  HeaderComponent,
  LoginComponent,
  ErrorComponent,
  LeftpanelComponent,
  LeftmenuitemComponent,
  RightpanelComponent,
  RegistrationComponent,
  AdmissionComponent,
  RegistrationListComponent,
  AdmissionListComponent,
  ApprovedListComponent,

  CompMapDirective,
  TemplateMapDirective,
  InnerHeaderComponent,
  PageTitleComponent,
  TitleComponent,
  BedcrumbComponent,
  VerticalLabelTypeComponent,
  LoaderComponent,
  HeaderButtonsComponent,
  NewRegisterationButtonComponent,
  PageNotFoundComponent,
  ImgcaptureComponent,
  GenericPopup,
  GenericModalContent,
  SearchComponent,
  SelectedComponent,
  DoctorComponent,
  DepartmentComponent,
  DepartmentListComponent,
  DepartmentTypeComponent,
  DepartmentTypeListComponent,
  HospitalDetailsComponent,
  HospitalDetailsListComponent,
  PackagePipe,
  LicenceRenewalComponent,
  LicenceListComponent,
  BuildingComponent,
  BuildingListComponent,
 
  FloorComponent,
  FloorListComponent,
  WardTypeComponent,
  WardTypeListComponent,
  SurgeryTypeComponent,
  SurgeryTypeListComponent,
  AdmissionTypeComponent,
  AdmissionTypeListComponent,
  DischargeTypeComponent,
  DischargeTypeListComponent,
  DeliveryTypeComponent,
  DeliveryTypeListComponent,
  OperationTypeComponent,
  OperationTypeListComponent,
  PregnantTreatmentComponent,
  PregnantTreatmentListComponent,
  VaccineTypeComponent,
  VaccineTypeListComponent,
  GenericActionComponent,
  ConfirmationModal,
  DiseaseTypeComponent,
  DiseaseTypeListComponent,
  DocrepoComponent,
  PackagesComponent,
  PackagesListComponent,
  DragDropDirective,
  DashboardComponent,
  AppdashboardComponent,
  PatientsummaryComponent,
  MedicalInsuranceComponent,
  ApprovalChartComponent,
  IncomeSummaryComponent,
  WardProgressComponent,
  SessionCheckDirective,
  WardTypeModal,
  WardTypeModalItem,
  BedModal,
  BedModalItem,

  BillingListComponent,
  ApprovalListComponent,
  BillingComponent,
  ApprovalComponent,
  PrescriptionComponent,
  PrescriptionListComponent,

  OtComponent,
  OtListComponent,
  ForgetPasswordModal,
  DischargeCertificateComponent,
  DischargeCertificateListComponent,
  SaveMessageModal,
  DoctorListComponent,
  WardComponent,
  WardListComponent,
  BedComponent,
  BedListComponent,
  OttypeComponent,
  OttypeListComponent,
  IconListComponent,
  NewBornComponent,
  NewBornListComponent,
  AdmissionConfirmationModal,
  KeyupSearchComponent,
  PriceComponent,
  PricelistComponent,
  BillingPreviewComponent,
  //HelperFunction,
  GenericActionModal,
  DischargeModalComponent,
  HeaderButtonPrescriptionComponent,
  hospitaltitleComponent,
  ApprovalDashboardListComponent
]
export const ENTRY_COMPONENTS: Array<any> = [
  ApproverListComponent,
  ApproverComponent,
  ApprovalDashboardComponent,
  RegistrationComponent,
  AdmissionComponent,
  RegistrationListComponent,
  GenericModalContent,
  DoctorComponent,
  DepartmentListComponent,
  DepartmentComponent,
  DepartmentTypeListComponent,
  DepartmentTypeComponent,
  HospitalDetailsComponent,
  HospitalDetailsListComponent,
  LicenceRenewalComponent,
  LicenceListComponent,
  BuildingComponent,
 
  BuildingListComponent,
  FloorComponent,
  FloorListComponent,
  WardTypeComponent,
  WardTypeListComponent,
  SurgeryTypeComponent,
  SurgeryTypeListComponent,
  AdmissionTypeComponent,
  AdmissionTypeListComponent,
  DischargeTypeComponent,
  DischargeTypeListComponent,
  DeliveryTypeComponent,
  DeliveryTypeListComponent,
  OperationTypeComponent,
  OperationTypeListComponent,
  PregnantTreatmentComponent,
  PregnantTreatmentListComponent,
  VaccineTypeComponent,
  VaccineTypeListComponent,
  ConfirmationModal,
  DiseaseTypeComponent,
  DiseaseTypeListComponent,
  DocrepoComponent,
  PackagesComponent,
  PackagesListComponent,
  DashboardComponent,
  AdmissionListComponent,
  WardTypeModal,
  BedModal,
  BillingListComponent,
  ApprovalListComponent,
  BillingComponent,
  ApprovalComponent,
  PrescriptionComponent,
  PrescriptionListComponent,
  OtComponent,
  OtListComponent,
  ForgetPasswordModal,
  DischargeCertificateComponent,
  DischargeCertificateListComponent,
  SaveMessageModal,
  DoctorListComponent,
  WardComponent,
  WardListComponent,
  BedComponent,
  BedListComponent,
  OttypeComponent,
  OttypeListComponent,
  NewBornComponent,
  NewBornListComponent,
  AdmissionConfirmationModal,
  PriceComponent,
  PricelistComponent,
  BillingPreviewComponent,
  //HelperFunction,
  GenericActionModal,
  DischargeModalComponent,
  HeaderButtonPrescriptionComponent,
  ApprovedListComponent,
  ApprovalDashboardListComponent

]
