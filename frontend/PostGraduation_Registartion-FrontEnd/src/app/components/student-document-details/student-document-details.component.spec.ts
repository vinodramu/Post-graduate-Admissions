import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDocumentDetailsComponent } from './student-document-details.component';

describe('StudentDocumentDetailsComponent', () => {
  let component: StudentDocumentDetailsComponent;
  let fixture: ComponentFixture<StudentDocumentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDocumentDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
