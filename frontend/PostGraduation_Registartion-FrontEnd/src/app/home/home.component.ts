import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showTabs: boolean = false;
  constructor(private router: Router) { }

  createUser() {
    // Add your logic for creating a user
    console.log('Create User button clicked');
  }

  login() {
    // Add your logic for login
    console.log('Login button clicked');
  }


  navigateToAdminLogin(): void {
    this.router.navigate(['/studentUniversityRegistration']);
  }
  navigateToSuperAdminLogin(): void {
    
  }
  navigateToExaminationLogin(): void {
    
  }

}
