import { TestBed, inject } from '@angular/core/testing';

import { HelperFunction } from './helper-function.service';

describe('HelperFunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperFunction]
    });
  });

  it('should be created', inject([HelperFunction], (service: HelperFunction) => {
    expect(service).toBeTruthy();
  }));
});
