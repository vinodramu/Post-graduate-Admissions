import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { map, Observable } from 'rxjs';
// import { StudentPersonalData } from '../models/studentPersonalData.model';
// import { StudentApplicationCourseData } from '../models/studentApplicationCourseData.model';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService { 
  constructor(private http: HttpClient,private enviironment:Environment) { }

  private apiUrl = this.enviironment.baseUrl1;
  private apiUrl2 = this.enviironment.baseUrl2;
  getAllCourses(){
    return this.http.get<any>(`${this.apiUrl}/course`);
  }

  getFeeByCourse(course:string){
    return this.http.get<any>(`${this.apiUrl}/course`);
  }

  getCourseIdByStudentId():Observable<string>{
    return this.http.get<any>("").pipe(
      map(response => response.courseId)
    );
  }

  saveCourseByCourseId(courseid:string,fees:number):Observable<any>{
    const body={
      studentId:localStorage.getItem('studentId'),
      status:'' ,
      submissionDate:null,
      courseId:courseid,
      fee:fees
    }
   return this.http.post<any>(`${this.apiUrl2}/applications`,body);
  }

}