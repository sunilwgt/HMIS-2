import { UserDetail } from "./userole";
import { Option } from "./common";

export class Department extends UserDetail {
  department_name: string;
  ID?: string;
  constructor() {
    super();
  }
}

export class DepartmentType extends UserDetail {
  department_type_name: string;
  constructor() {
    super();
  }
}

export class DepartmentOption extends Option {
  constructor() {
    super()
  }
}
// export class ApproveOption extends Option {
//   constructor() {
//     super()
//   }
// }

export class DepartmentTypeOption extends Option {
  constructor() {
    super()
  }  
}
export class DischargeCertificateOption extends Option{
  constructor(){
    super()
  }
}

