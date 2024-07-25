import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentPersonalData } from '../models/studentPersonalData.model';
import { StudentApplicationCourseData } from '../models/studentApplicationCourseData.model';

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {
  private apiUrl = 'http://192.168.0.109:3000'; 
  constructor(private http: HttpClient) { }

  saveStudentApplicationData(studePersonalData:StudentPersonalData,atudentApplicationCourseData:StudentApplicationCourseData){
    const body = { studePersonalData, atudentApplicationCourseData }
    return this.http.post<any>(`${this.apiUrl}/students/create`, body);
  }
}
