import { TestBed, inject } from '@angular/core/testing';

import { CompLoadManagerService } from './comp-load-manager.service';

describe('CompLoadManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompLoadManagerService]
    });
  });

  it('should be created', inject([CompLoadManagerService], (service: CompLoadManagerService) => {
    expect(service).toBeTruthy();
  }));
});
