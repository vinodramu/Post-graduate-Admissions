import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StudentPersonalDetailsService {

  constructor(private http: HttpClient,private enviironment:Environment) { }

  private apiUrl = this.enviironment.baseUrl2;

}
