import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  createUser() {
    // Add your logic for creating a userconsole.log('Create User button clicked');
  }
  superAdmin() {
    // Add your logic for super admin loginconsole.log('Super Admin button clicked');
  }

  isPopupVisible = false;
  userEmail = '';
  password = '';

  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isPopupVisible = false;
    }
  }
  handleKeyboardEvent(event: Event): void {
    if (event instanceof KeyboardEvent) {
      // Handle keyboard event
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPopupVisible = false;
      }
    }
  }

  onLoginSubmit() {
    // Handle login logic here
    console.log('User ID:', this.userEmail);
    console.log('Password:', this.password);
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    alert('Forgot Password clicked!');
  }

}
