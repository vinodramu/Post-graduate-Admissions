import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentPersonalData } from '../models/studentPersonalData.model';
import { StudentApplicationCourseData } from '../models/studentApplicationCourseData.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {
  private apiUrl = 'http://192.168.0.109:3000'; 
  constructor(private http: HttpClient) { }

  saveStudentApplicationData(
    student: StudentPersonalData,
    application: StudentApplicationCourseData,
    aadhar_photo:File,
    student_photo:File,
    signature:File,
    degree_certificate:File,
    intermediate_certificate:File,
    tenth_certificate:File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('student', JSON.stringify(student));
    formData.append('application', JSON.stringify(application));
    formData.append('aadhar_photo',aadhar_photo)
    formData.append('student_photo',student_photo)
    formData.append('signature',signature)
    formData.append('degree_certificate',degree_certificate)
    formData.append('intermediate_certificate',intermediate_certificate)
    formData.append('tenth_certificate',tenth_certificate)
    return this.http.post(`${this.apiUrl}/students/create`, formData);
  }
}
