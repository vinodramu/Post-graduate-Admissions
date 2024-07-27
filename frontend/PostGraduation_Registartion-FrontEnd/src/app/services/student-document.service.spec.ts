import { TestBed } from '@angular/core/testing';

import { StudentDocumentService } from './student-document.service';

describe('StudentDocumentService', () => {
  let service: StudentDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
