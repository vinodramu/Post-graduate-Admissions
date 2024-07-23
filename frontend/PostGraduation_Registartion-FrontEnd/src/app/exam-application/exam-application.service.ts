import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamApplication } from './exam-application.model';


@Injectable({
  providedIn: 'root'
})
export class ExamApplicationService {

  private apiUrl = 'http://192.168.0.109:3000/api';

  constructor(private http: HttpClient) { }

  getApplications(): Observable<ExamApplication[]> {
    return this.http.get<ExamApplication[]>(this.apiUrl);
  }

  getApplication(id: number): Observable<ExamApplication> {
    return this.http.get<ExamApplication>(`${this.apiUrl}/${id}`);
  }

  addApplication(application: ExamApplication): Observable<ExamApplication> {
    return this.http.post<ExamApplication>(this.apiUrl, application);
  }

  updateApplication(id: number, application: ExamApplication): Observable<ExamApplication> {
    return this.http.put<ExamApplication>(`${this.apiUrl}/${id}`, application);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
