import { TestBed } from '@angular/core/testing';

import { ServiceClientService } from './serviceclient.service';

describe('ServiceClientService', () => {
  let service: ServiceClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
