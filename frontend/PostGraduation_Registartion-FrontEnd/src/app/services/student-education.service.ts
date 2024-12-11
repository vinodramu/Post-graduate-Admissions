import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { map, Observable } from 'rxjs';
import { StudentEducationdata } from '../models/studentEducatioData.model';

@Injectable({
  providedIn: 'root'
})
export class StudentEducationService {

  constructor(private http: HttpClient,private enviironment:Environment) { }

  private apiUrl = this.enviironment.baseUrl2;

  getEducationDetailsByStudentId():Observable<StudentEducationdata[]>{
    return this.http.get<any>(`${this.apiUrl}/educationalDetails/${localStorage.getItem('studentId')}`).pipe(
      map(response => response.education)
    );
  }

  saveEducationalData(educationalData:StudentEducationdata[]){
    const body ={
      studentId: localStorage.getItem('studentId'),
      education: educationalData 
      }
    return this.http.post<any>(`${this.apiUrl}/educationalDetails`,body)
  }
  updateEducationalData(educationalData:StudentEducationdata[]){
    const body ={
      studentId: localStorage.getItem('studentId'),
      education: educationalData 
      }
    return this.http.put<any>(`${this.apiUrl}/educationalDetails/${body.studentId}`,body)
  }

}
