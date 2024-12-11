import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'https://api.example.com'; // Replace with your API URL

  private colllegeUrl = 'http://192.168.0.102:4000'

  constructor(private http: HttpClient) { }
  getColleges(): Observable<any> {
    return this.http.get(`${this.colllegeUrl}/college/get/colleges`);
  }

  getCoursesByCollegeNaame(collegeName: string): Observable<any> {
    return this.http.get(`${this.colllegeUrl}/course/get/${collegeName}`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`https://freetestapi.com/api/v1/countries`);
  }
  
  getStatesByCountry(countryName: string): Observable<string[]> {
    return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/states').pipe(
      map(data => {
        const country = data.data.find((c: any) => c.name === countryName);
        return country ? country.states.map((state: any) => state.name) : [];
      })
    );
  }

}
