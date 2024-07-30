import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetComponent } from './paymet.component';

describe('PaymetComponent', () => {
  let component: PaymetComponent;
  let fixture: ComponentFixture<PaymetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymetComponent]
    });
    fixture = TestBed.createComponent(PaymetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
