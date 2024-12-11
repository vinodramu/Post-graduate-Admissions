import { TestBed } from '@angular/core/testing';

import { StudentEducationService } from './student-education.service';

describe('StudentEducationService', () => {
  let service: StudentEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
