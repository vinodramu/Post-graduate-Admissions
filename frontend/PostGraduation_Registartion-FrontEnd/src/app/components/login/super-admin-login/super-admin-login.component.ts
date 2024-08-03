import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.scss']
})
export class SuperAdminLoginComponent {
  adminId!: string;
  password!: string;
  adminIdError!: string;
  passwordError!: string;
  loginError!: string;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.adminIdError = '';
    this.passwordError = '';
    this.loginError = '';

    if (!this.adminId) {
      this.adminIdError = 'Enter adminId';
    }

    if (!this.password) {
      this.passwordError = 'Enter password';
    }

    if (this.adminId && this.password) {
      const loginData = {
        adminId: this.adminId,
        password: this.password
      };

      this.http.post<LoginResponse>('http://192.168.0.102:4000/superAdmin/login', loginData, { observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Login request failed', error);
          return throwError(error);
        })
      )
      .subscribe(
        (response: HttpResponse<LoginResponse>) => {
          if (response.status === 200 && response.body) {
            const accessToken = response.body.accessToken;
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
              console.log('Login successful');
              setTimeout(() => {
                this.router.navigate(['/manageAdmins']);
              }, 0);
            } else {
              this.loginError = 'Invalid adminId or password';
            }
          }
        },
        error => {
          if (error.status === 401) {
            this.loginError = 'Invalid adminId or password';
          } else {
            this.loginError = 'An error occurred while processing your request.';
          }
        }
      );
    }}

  onForgotPassword() {
    alert('Forgot Password functionality needs to be implemented.');
  }
}

interface LoginResponse {
  accessToken: string;
}