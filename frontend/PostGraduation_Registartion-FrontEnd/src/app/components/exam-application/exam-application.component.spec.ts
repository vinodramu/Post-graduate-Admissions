import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamApplicationComponent } from './exam-application.component';

describe('ExamApplicationComponent', () => {
  let component: ExamApplicationComponent;
  let fixture: ComponentFixture<ExamApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamApplicationComponent]
    });
    fixture = TestBed.createComponent(ExamApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
