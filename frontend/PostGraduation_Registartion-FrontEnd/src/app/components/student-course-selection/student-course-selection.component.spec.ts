import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseSelectionComponent } from './student-course-selection.component';

describe('StudentCourseSelectionComponent', () => {
  let component: StudentCourseSelectionComponent;
  let fixture: ComponentFixture<StudentCourseSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseSelectionComponent]
    });
    fixture = TestBed.createComponent(StudentCourseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
