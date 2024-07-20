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
  navigateToAdminLogin(): void {
    this.router.navigate(['/adminLogin']);
  }
  navigateToSuperAdminLogin(): void {
    this.router.navigate(['/superAdminLogin']);
  }
  navigateToExaminationLogin(): void {
    this.router.navigate(['/examinationLogin']);
  }
  navigateToChairpersonLogin(): void {
    this.router.navigate(['/chairpersonLogin']);
  }


}
