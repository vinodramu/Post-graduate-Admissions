import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairpersonLoginComponent } from './chairperson-login.component';

describe('ChairpersonLoginComponent', () => {
  let component: ChairpersonLoginComponent;
  let fixture: ComponentFixture<ChairpersonLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChairpersonLoginComponent]
    });
    fixture = TestBed.createComponent(ChairpersonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
