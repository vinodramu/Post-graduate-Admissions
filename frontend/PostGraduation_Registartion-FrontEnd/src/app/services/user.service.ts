import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../models/userData.model';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private environment:Environment) { }
  private apiUrl = this.environment.baseUrl2;

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
  getUserByEmail(userEmail:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/by-email/${userEmail}`);
  }
}