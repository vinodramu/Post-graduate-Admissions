import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  loginError = false;

  constructor(private authService: AuthService,private router:Router) { }

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
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPopupVisible = false;
      }
    }
  }

  onLoginSubmit() {
    this.authService.login(this.userEmail, this.password).subscribe(
      response => {
        this.loginError = false;
        localStorage.setItem('userName', response.username)
        localStorage.setItem('userEmail', response.email)
        localStorage.setItem('userPhone', response.phone)
        console.log(response)
        this.router.navigate(['/exam-application']); 
      },
      error => {
        console.log(error)
        this.loginError = true;
      }
    );
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    alert('Forgot Password clicked!');
  }


}
