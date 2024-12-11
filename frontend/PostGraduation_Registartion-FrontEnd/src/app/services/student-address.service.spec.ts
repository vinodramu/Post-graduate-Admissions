import { TestBed } from '@angular/core/testing';

import { StudentAddressService } from './student-address.service';

describe('StudentAddressService', () => {
  let service: StudentAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
