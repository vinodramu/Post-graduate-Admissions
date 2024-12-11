import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentForm!: FormGroup;
  colleges = ['College 1', 'College 2', 'College 3', 'College 4', 'College 5', 'College 6', 'College 7'];
  courses = ['Course 1', 'Course 2', 'Course 3'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      adharNo: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      degreeName: ['', Validators.required],
      yop: ['', Validators.required],
      cgpa: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      hallTicketNumber: ['', Validators.required],
      degreeCertificate: [''],
      photo: [''],
      college1: ['', Validators.required],
      course1: ['', Validators.required],
      college2: ['', Validators.required],
      course2: ['', Validators.required],
      college3: ['', Validators.required],
      course3: ['', Validators.required]
    });
  }

  onSave() {
    console.log('Form data saved:', this.studentForm.value);
  }

  onEdit() {
    console.log('Form data for editing:', this.studentForm.value);
  }

  onSubmit() {
    console.log('Form submitted:', this.studentForm.value);
  }
}
