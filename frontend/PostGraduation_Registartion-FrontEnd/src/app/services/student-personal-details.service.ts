import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { StudentPersonalData } from '../models/studentPersonalData.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentPersonalDetailsService {

  constructor(private http: HttpClient, private enviironment: Environment) { }

  private apiUrl = this.enviironment.baseUrl2;

  getStudentPersonalDetails(userEmail: string): Observable<StudentPersonalData> {
    return this.http.get<StudentPersonalData>(`${this.apiUrl}/personalDetails/${userEmail}`)
      .pipe(
        map((data: any) => {
          return {
            name: data.name,
            dateOfBirth: new Date(data.dateOfBirth),
            gender: data.gender,
            email: data.email,
            phoneNumber: data.phoneNumber
          } as StudentPersonalData;
        })
      );
  }

  saveStudentPersonalData(studentPersonalData:StudentPersonalData):Observable<StudentPersonalData>{
    return this.http.post<StudentPersonalData>(`${this.apiUrl}/personalDetails`,studentPersonalData);
  }

}
