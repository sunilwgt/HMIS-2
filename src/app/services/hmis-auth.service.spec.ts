import { TestBed, inject } from '@angular/core/testing';

import { HmisAuthService } from './hmis-auth.service';

describe('HmisAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HmisAuthService]
    });
  });

  it('should be created', inject([HmisAuthService], (service: HmisAuthService) => {
    expect(service).toBeTruthy();
  }));
});
