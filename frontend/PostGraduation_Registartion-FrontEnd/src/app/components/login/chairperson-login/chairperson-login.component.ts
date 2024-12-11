import { Component } from '@angular/core';

@Component({
  selector: 'app-chairperson-login',
  templateUrl: './chairperson-login.component.html',
  styleUrls: ['./chairperson-login.component.scss']
})
export class ChairpersonLoginComponent {

  
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
      this.userIdError = 'Enter UserId';
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

  onForgotPassword() {
    // Handle forgot password logic here
    alert('Forgot Password functionality needs to be implemented.');
  }
}
