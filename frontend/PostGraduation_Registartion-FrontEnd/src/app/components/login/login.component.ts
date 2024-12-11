import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }
  userId: string = '';
  password: string = '';


  private redirectBasedOnRole(): void {
    const role = this.authService.getRole();
    if (role === 'student') {
      this.router.navigate(['/student-dashboard']); // Replace with your student path
    } else if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']); // Replace with your admin path
    } else {
      this.router.navigate(['/login']); // Fallback path
    }
  } 

  onSubmit() {
    // Handle the login logic here
    this.redirectBasedOnRole()
    console.log('User ID:', this.userId);
    console.log('Password:', this.password);
  }
  onForgotPassword() {
    // Handle forgot password logic here
    alert('Forgot Password functionality needs to be implemented.');
  }
}
