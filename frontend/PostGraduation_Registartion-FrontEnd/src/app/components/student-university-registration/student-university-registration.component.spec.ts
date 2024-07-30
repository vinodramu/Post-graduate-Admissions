import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUniversityRegistrationComponent } from './student-university-registration.component';

describe('StudentUniversityRegistrationComponent', () => {
  let component: StudentUniversityRegistrationComponent;
  let fixture: ComponentFixture<StudentUniversityRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUniversityRegistrationComponent]
    });
    fixture = TestBed.createComponent(StudentUniversityRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
