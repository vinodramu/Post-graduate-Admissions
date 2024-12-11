import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEducationalDetailsComponent } from './student-educational-details.component';

describe('StudentEducationalDetailsComponent', () => {
  let component: StudentEducationalDetailsComponent;
  let fixture: ComponentFixture<StudentEducationalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEducationalDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentEducationalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
