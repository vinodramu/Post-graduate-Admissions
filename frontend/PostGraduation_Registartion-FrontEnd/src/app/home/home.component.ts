import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) { }
  createUser() {
    // Add your logic for creating a userconsole.log('Create User button clicked');
  }
  login() {
    // Add your logic for loginconsole.log('Login button clicked');
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
