import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://192.168.0.102:4000/admin';

  constructor(private http: HttpClient) { }
  getAdmins(page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&limit=${limit}`).pipe(
      map(response => ({
        items: response.data,  // Assuming 'data' is the array of admins
        total: response.total  // Assuming 'total' is the total number of admins
      }))
    );
  }
 
  createAdmin(admin: any): Observable<any> {
    return this.http.post(`http://192.168.0.102:4000/superAdmin/create/admin`, admin);
  }

  updateAdmin(id: string, admin: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, admin);
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
