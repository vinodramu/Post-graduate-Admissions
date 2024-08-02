import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { map, Observable } from 'rxjs';
import { StudentCourse } from '../models/studentCourse.model';
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

  getApplicationByStudentId(): Observable<any> {
    const studentId = localStorage.getItem('studentId');
    return this.http.get<any>(`${this.apiUrl2}/applications/getApplicationByStudentId/${studentId}`);
  }

  // saveCourseByCourseId(courseid:string,fees:number):Observable<any>{
  //   const body={
  //     studentId:localStorage.getItem('studentId'),
  //     status:'pending' ,
  //     submissionDate:Date.now,
  //     courseId:courseid,
  //     fee:fees
  //   }
  //  return this.http.post<any>(`${this.apiUrl2}/applications`,body);
  // }

  updateCoursesByCourseId(body: any): Observable<any> {
    const reqBody={ 
      studentId:body.studentId,
      application:body.application
    } 
    return this.http.put<any>(`${this.apiUrl2}/applications/${localStorage.getItem('studentId')}`, reqBody);
  }


  saveSelectedCourses(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/applications/create`, requestBody);
  }

}
