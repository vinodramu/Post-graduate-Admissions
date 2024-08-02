import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'https://api.example.com'; // Replace with your API URL
  private collegeUrl = 'http://192.168.0.102:4000';
  private universalTutorialUrl = 'https://www.universal-tutorial.com/api';
  private apiTokenHeaders = new HttpHeaders({
    "Accept": "application/json",
    "api-token": "54bxXEOPfxB8UJJjoUZscriks1HHrkg0-GkA_hapyErOMFmIXWmz26zS4ihOtV2GnJc",
    "user-email": "sanjay@electems.com"
  });
  private accessToken: string | null = null;
  constructor(private http: HttpClient) { }
  

  getColleges(): Observable<any> {
    return this.http.get(`${this.collegeUrl}/college/get/colleges`);
  }

  getCoursesByCollegeName(collegeName: string): Observable<any> {
    return this.http.get(`${this.collegeUrl}/course/get/${collegeName}`);
  }

  private getAccessToken(): Observable<string> {
    return this.http.get<{ auth_token: string }>(`${this.universalTutorialUrl}/getaccesstoken`, { headers: this.apiTokenHeaders }).pipe(
      tap(response => this.accessToken = response.auth_token),
      switchMap(() => {
        if (this.accessToken) {
          return of(this.accessToken);
        } else {
          throw new Error('Failed to retrieve access token');
        }
      }),
      catchError(error => {
        console.error('Error retrieving access token:', error);
        return throwError(() => new Error('Failed to retrieve access token'));
      })
    );
  }

  getCountries(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.universalTutorialUrl}/countries/`, { headers }).pipe(
          catchError(error => {
            console.error('Error fetching countries:', error);
            return throwError(() => new Error('Failed to fetch countries'));
          })
        );
      })
    );
  }

  getStatesByCountry(country: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.universalTutorialUrl}/states/${country}`, { headers }).pipe(
          catchError(error => {
            console.error('Error fetching states:', error);
            return throwError(() => new Error('Failed to fetch states'));
          })
        );
      })
    );
  }

  getCitiesByState(state: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.universalTutorialUrl}/cities/${state}`, { headers }).pipe(
          catchError(error => {
            console.error('Error fetching cities:', error);
            return throwError(() => new Error('Failed to fetch cities'));
          })
        );
      })
    );
  }
  getPincodesByCity(city: string): Observable<any> {
    const url = `https://api.postalpincode.in/postoffice/${city}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response[0] && response[0].PostOffice) {
          return response[0].PostOffice.map((post: any) => post.Pincode);
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching pincodes:', error);
        return throwError(() => new Error('Failed to fetch pincodes'));
      })
    );
  }
  

}

