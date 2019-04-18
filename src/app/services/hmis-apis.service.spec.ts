import { TestBed, inject } from '@angular/core/testing';

import { HmisApisService } from './hmis-apis.service';

describe('HmisApisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HmisApisService]
    });
  });

  it('should be created', inject([HmisApisService], (service: HmisApisService) => {
    expect(service).toBeTruthy();
  }));
});
