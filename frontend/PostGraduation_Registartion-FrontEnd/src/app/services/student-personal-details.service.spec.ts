import { TestBed } from '@angular/core/testing';

import { StudentPersonalDetailsService } from './student-personal-details.service';

describe('StudentPersonalDetailsService', () => {
  let service: StudentPersonalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPersonalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
