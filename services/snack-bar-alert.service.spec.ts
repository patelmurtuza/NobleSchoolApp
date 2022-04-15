import { TestBed } from '@angular/core/testing';

import { SnackBarAlertService } from './snack-bar-alert.service';

describe('SnackBarAlertService', () => {
  let service: SnackBarAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
