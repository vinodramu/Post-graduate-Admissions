import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  onSubmit() {
    // Handle the login logic here
    console.log('User ID:', this.userId);
    console.log('Password:', this.password);
  }
  onForgotPassword() {
    // Handle forgot password logic here
    alert('Forgot Password functionality needs to be implemented.');
  }
}
