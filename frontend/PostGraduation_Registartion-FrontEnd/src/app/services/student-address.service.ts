import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Observable } from 'rxjs';
import { StudentAddress } from '../models/studentAddress.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAddressService {

  constructor(private http: HttpClient, private enviironment: Environment) { }

  private apiUrl = this.enviironment.baseUrl2;

  getStudentAddressByStudentId(personalId: string):Observable<StudentAddress>{
    return this.http.get<StudentAddress>(`${this.apiUrl}/address/${personalId}`);
  }

  saveStudentAddressData(studentAddressData:StudentAddress):Observable<StudentAddress>{
    return this.http.post<StudentAddress>(`${this.apiUrl}/address`,studentAddressData);
  }
  updateStudentAddressData(studentAddressData:StudentAddress):Observable<StudentAddress>{
    return this.http.put<StudentAddress>(`${this.apiUrl}/address/student/${studentAddressData.studentId}`,studentAddressData);
  }
}
