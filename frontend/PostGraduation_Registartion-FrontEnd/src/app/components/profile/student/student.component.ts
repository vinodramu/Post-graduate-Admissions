import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  studentForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentId: [{ value: '', disabled: true }],
      name: [''],
      email: [''],
      gpa: [''],
      enrollmentDate: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('id');
      this.loadStudent(studentId);
    });
  }

  loadStudent(id: string | null): void {
    // Fetch student data based on ID. This is a mock; replace with your service call.
    const students = [
      { studentId: 'S001', name: 'John Doe', email: 'john.doe@example.com', gpa: 3.5, enrollmentDate: '2024-01-15' },
      { studentId: 'S002', name: 'Jane Smith', email: 'jane.smith@example.com', gpa: 3.8, enrollmentDate: '2023-09-22' },
      { studentId: 'S003', name: 'Alice Johnson', email: 'alice.johnson@example.com', gpa: 3.6, enrollmentDate: '2023-12-05' },
      { studentId: 'S004', name: 'Bob Brown', email: 'bob.brown@example.com', gpa: 3.4, enrollmentDate: '2024-02-10' },
      { studentId: 'S005', name: 'Charlie Davis', email: 'charlie.davis@example.com', gpa: 3.7, enrollmentDate: '2023-10-11' }
    ];
    const student = students.find(student1 => student1.studentId === id);
    if (student) {
      this.studentForm.patchValue(student);
    }
  }
}
