import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentReportService {

  private students = [
    { id: 1, name: 'John Doe', department: 'Computer Science', admission_date: new Date('2023-01-10'), email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', department: 'Mechanical Engineering', admission_date: new Date('2023-02-15'), email: 'jane.smith@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Alice Johnson', department: 'Civil Engineering', admission_date: new Date('2023-03-20'), email: 'alice.johnson@example.com', phone: '111-222-3333' },
    { id: 4, name: 'Bob Brown', department: 'Electrical Engineering', admission_date: new Date('2023-04-25'), email: 'bob.brown@example.com', phone: '444-555-6666' },
    { id: 5, name: 'Charlie Davis', department: 'Chemical Engineering', admission_date: new Date('2023-05-30'), email: 'charlie.davis@example.com', phone: '777-888-9999' },
    { id: 6, name: 'Charlie Davis', department: 'Chemical Engineering', admission_date: new Date('2023-05-30'), email: 'charlie.davis@example.com', phone: '777-888-9999' }
  ];

 

  getReport(): Observable<any> {
    return of({
      totalCount: this.students.length,
      studentDetails: this.students
    });
  }

  getStudentById(id: number) {
    return this.students.find(student => student.id === id);
  }

  updateStudent(id: number, updatedStudent: any): void {
    const studentIndex = this.students.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
      this.students[studentIndex] = { id, ...updatedStudent };
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
  }
}
