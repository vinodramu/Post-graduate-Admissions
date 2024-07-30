import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalDetailsComponent } from './student-personal-details.component';

describe('StudentPersonalDetailsComponent', () => {
  let component: StudentPersonalDetailsComponent;
  let fixture: ComponentFixture<StudentPersonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPersonalDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
