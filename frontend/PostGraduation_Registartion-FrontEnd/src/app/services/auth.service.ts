import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private envornment:Environment) { }
  private apiUrl = this.envornment.baseUrl2;

  login(userEmail: string, password: string): Observable<any> {
    const loginData = { email: userEmail, password: password };
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, loginData).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userEmail',userEmail)
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRole(): string | null {
    return localStorage.getItem('role'); // Method to retrieve the user role
  }
}
