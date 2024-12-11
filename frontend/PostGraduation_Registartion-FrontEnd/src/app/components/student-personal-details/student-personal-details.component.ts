import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentPersonalData } from 'src/app/models/studentPersonalData.model';
import { StudentPersonalDetailsService } from 'src/app/services/student-personal-details.service';

@Component({
  selector: 'app-student-personal-details',
  templateUrl: './student-personal-details.component.html',
  styleUrls: ['./student-personal-details.component.scss']
})
export class StudentPersonalDetailsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private studentPersonaldetailService:StudentPersonalDetailsService,
    private router:Router
  ) { }
  submitted=false;
  studentPersonalDetailsForm!: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  studentPersonalData!:StudentPersonalData;
  isStudentPersonalDetailsPresent=false;
  ngOnInit() {
    this.fetchStudentPersonalDetails(`${localStorage.getItem('userEmail')}`)
    this.studentPersonalDetailsForm = this.formBuilder.group({
      name: [`${localStorage.getItem('userName')}`, Validators.required],
      dateOfBirth: [this.studentPersonalData?.dateOfBirth ? new Date(this.studentPersonalData.dateOfBirth) : '', Validators.required],
      gender: [this.studentPersonalData?.gender || '', Validators.required],
      email: [`${localStorage.getItem('userEmail')}`, [Validators.required, Validators.email]],
      phoneNumber: [`${localStorage.getItem('userPhone')}`, Validators.required], 
    });
  }
  private mapFormToStudentPersonalData(formValue: any): void {
    this.studentPersonalData = {
      name: formValue.name,
      dateOfBirth: new Date(formValue.dateOfBirth),
      gender: formValue.gender,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber
    };
  }
  fetchStudentPersonalDetails(userEmail: string): void {
    this.studentPersonaldetailService.getStudentPersonalDetails(userEmail)
      .subscribe((data: StudentPersonalData) => {
        this.studentPersonalData = data;
        if (this.studentPersonalData!=null) {
          this.isStudentPersonalDetailsPresent=true;
        } 
      });
  }

  onSubmit(): void {
    if (this.studentPersonalDetailsForm.valid) {
      this.submitted = true;
      this.mapFormToStudentPersonalData(this.studentPersonalDetailsForm.value);
      if(this.isStudentPersonalDetailsPresent==null){
        // updtae API
      }else{
      this.studentPersonaldetailService.saveStudentPersonalData(this.studentPersonalData)
        .subscribe(response => {
          console.log('Data saved successfully:', response);
          localStorage.setItem('studentId', response._id);
          this.router.navigate(['/studentAddressDeatialsForm']);
        }, error => {
          console.error('Error saving data:', error);
        });
    }}else {
      console.log('Form is invalid');
    }
  }
}
