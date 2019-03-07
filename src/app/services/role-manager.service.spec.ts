import { TestBed, inject } from '@angular/core/testing';

import { RoleManagerService } from './role-manager.service';

describe('RoleManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleManagerService]
    });
  });

  it('should be created', inject([RoleManagerService], (service: RoleManagerService) => {
    expect(service).toBeTruthy();
  }));
});
