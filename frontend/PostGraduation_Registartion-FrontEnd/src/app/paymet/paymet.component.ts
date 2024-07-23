import { Component } from '@angular/core';

@Component({
  selector: 'app-paymet',
  templateUrl: './paymet.component.html',
  styleUrls: ['./paymet.component.scss']
})
export class PaymetComponent {

  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'];
  selectedPaymentMethod: string | undefined;
  showSuccessPopup = false;
  showFailurePopup = false;

  onSubmit() {
    //  payment process
    console.log(this.selectedPaymentMethod)
    const isPaymentSuccessful = Math.random() < 0.5;

    if (isPaymentSuccessful) {
      this.showSuccessPopup = true;
    } else {
      this.showFailurePopup = true;
    }
  }

  closePopup() {
    this.showSuccessPopup = false;
    this.showFailurePopup = false;
  }
}
