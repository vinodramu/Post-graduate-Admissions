import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDocumentService {

  constructor(private http: HttpClient,private enviironment:Environment) { }

  private apiUrl = this.enviironment.baseUrl2;

   uploadFiles(studentId: string,formData:FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/documents/upload/${studentId}`, formData);
  }
}
