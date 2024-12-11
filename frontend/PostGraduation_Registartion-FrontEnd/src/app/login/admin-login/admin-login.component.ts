import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  userId!: string;
  password!: string;
  userIdError!: string;
  passwordError!: string;
  loginError!: string;

  // Hardcoded credentials
  readonly validUserId = 'admin';
  readonly validPassword = 'password123';

  onSubmit() {
    this.userIdError = '';
    this.passwordError = '';
    this.loginError = '';
    

    if (!this.userId) {
      this.userIdError = 'Enter userId';
    }

    if (!this.password) {
      this.passwordError = 'Enter password';
    }

    if (this.userId && this.password) {
      if (this.userId === this.validUserId && this.password === this.validPassword) {
        // Proceed with login logic
        console.log('Login successful');
      } else {
        this.loginError = 'Invalid userId or password';
      }
    }
  }

  validatePassword() {
    if (this.password.length < 8) {
      this.passwordError = 'Minimum length is 8';
    } else if (this.password.length > 16) {
      this.passwordError = 'Maximum length is 16';
    } else {
      this.passwordError = '';
    }
  }
  onForgotPassword() {
    // Handle forgot password logic here
    alert('Forgot Password functionality needs to be implemented.');
  }
}
