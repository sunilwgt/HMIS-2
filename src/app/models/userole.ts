export class UserDetail {
  uid?: string;
  username?: string;
  created_by?: string;
  modified_by?: string;
  constructor() {
  }
}

export class UserRP {
  $id: string;
  UserId: string;
  UserName: string;
  Roles: Array<Role>;
  Permissions: Array<Permission>;

  constructor() {
  }
}

export class Role {
  $id: string;
  role_id: string;
  role_name: string;
  role_description?: string;
  is_active: boolean;
  created_on: string;
  modified_on: string;
  created_by?: string;
  modified_by?: string;
  hmis_link_role_persmissions?: Array<any>;
  hmis_link_user_roles?: Array<any>;

  constructor() {
  }
}

export class Permission {
  $id: string;
  permissions_id: string;
  permissions_descriptions?: string;
  created_on: string;
  modified_on: string;
  access_area: string;
  can_read: boolean;
  can_update: boolean;
  can_create: boolean;
  can_delete: boolean;
  is_active: boolean;
  hmisRolePermissions?: Array<any>;

  constructor() {
  }

}
