import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../models/userData.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://192.168.0.109:3000/api';

  constructor(private http: HttpClient) { }
  saveUser(user: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${this.apiUrl}/register`, user);
  }
  sendOtp(phone:string):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/sendotp/${phone}`, null);
  }
  otpVarification(otp: string, phone: string): Observable<any> {
    const body = { phone, otp };
    return this.http.post(`${this.apiUrl}/varifyotp`, body);
  }
}