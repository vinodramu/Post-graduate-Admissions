import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.0.109:3000';
  constructor(private http: HttpClient) { }

  login(userEmail: string, password: string): Observable<any> {
    const loginData = { email: userEmail, password: password };
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, loginData).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userEmail',userEmail)
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
