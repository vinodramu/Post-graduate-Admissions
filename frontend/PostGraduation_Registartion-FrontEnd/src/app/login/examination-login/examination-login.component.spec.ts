import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationLoginComponent } from './examination-login.component';

describe('ExaminationLoginComponent', () => {
  let component: ExaminationLoginComponent;
  let fixture: ComponentFixture<ExaminationLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExaminationLoginComponent]
    });
    fixture = TestBed.createComponent(ExaminationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
