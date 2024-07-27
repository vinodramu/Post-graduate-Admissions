import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentPersonalData } from 'src/app/models/studentPersonalData.model';

@Component({
  selector: 'app-student-personal-details',
  templateUrl: './student-personal-details.component.html',
  styleUrls: ['./student-personal-details.component.scss']
})
export class StudentPersonalDetailsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  submitted=false;
  studentPersonalDetailsForm!: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  studentPersonalData!:StudentPersonalData;
  isStudentPresent=false;
  ngOnInit() {
    this.studentPersonalDetailsForm = this.formBuilder.group({
      name: [`${localStorage.getItem('userName')}`, Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: [`${localStorage.getItem('userEmail')}`, [Validators.required, Validators.email]],
      phoneNumber: [`${localStorage.getItem('userPhone')}`, Validators.required], 
    });
  }
  private mapFormToStudentPersonalData(formValue: any): void {
    this.studentPersonalData.name = formValue.name;
    this.studentPersonalData.dateOfBirth = new Date(formValue.date_of_birth); 
    this.studentPersonalData.gender = formValue.gender;
    this.studentPersonalData.email = formValue.email
  }
  get f() { return this.studentPersonalDetailsForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
