import { TestBed, inject } from '@angular/core/testing';

import { HmisAuthGuardService } from './hmis-auth-guard.service';

describe('HmisAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HmisAuthGuardService]
    });
  });

  it('should be created', inject([HmisAuthGuardService], (service: HmisAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
