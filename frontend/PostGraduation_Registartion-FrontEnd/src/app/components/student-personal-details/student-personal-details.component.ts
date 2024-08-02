import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentPersonalData } from 'src/app/models/studentPersonalData.model';
import { StudentPersonalDetailsService } from 'src/app/services/student-personal-details.service';

@Component({
  selector: 'app-student-personal-details',
  templateUrl: './student-personal-details.component.html',
  styleUrls: ['./student-personal-details.component.scss']
})
export class StudentPersonalDetailsComponent implements OnInit {
  submitted = false;
  studentPersonalDetailsForm!: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  studentPersonalData!: StudentPersonalData;
  isStudentPersonalDetailsPresent = false;
  personalId: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private studentPersonalDetailsService: StudentPersonalDetailsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
        this.personalId = params.get('PersonalId');
      if (this.personalId) {
        this.isStudentPersonalDetailsPresent = true;
        this.fetchStudentPersonalDetailsByPersonalId(this.personalId);
      } else {
        console.error('No PersonalId provided in route');
        this.fetchStudentPersonalDetails(`${localStorage.getItem('userEmail')}`);
      }
    });
  }

  private initializeForm() {
    this.studentPersonalDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  private mapFormToStudentPersonalData(formValue: any): void {
    this.studentPersonalData = {
      _id: localStorage.getItem('studentId') as string,
      name: formValue.name,
      dateOfBirth: new Date(formValue.dateOfBirth),
      gender: formValue.gender,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber
    };
  }

  fetchStudentPersonalDetails(userEmail: string): void {
    this.studentPersonalDetailsService.getStudentPersonalDetails(userEmail)
      .subscribe((data: StudentPersonalData) => {
        this.studentPersonalData = data;
        if (this.studentPersonalData != null) {
          this.isStudentPersonalDetailsPresent = true;
          this.studentPersonalDetailsForm.patchValue({
            name: this.studentPersonalData.name,
            dateOfBirth: this.formatDateForForm(this.studentPersonalData.dateOfBirth),
            gender: this.studentPersonalData.gender,
            email: this.studentPersonalData.email,
            phoneNumber: this.studentPersonalData.phoneNumber
          });
        }
      });
  }

  fetchStudentPersonalDetailsByPersonalId(PersonalId: string): void {
    this.studentPersonalDetailsService.getStudentPersonalDetailsByPersonalId(PersonalId)
      .subscribe((data: StudentPersonalData) => {
        this.studentPersonalData = data;
        if (this.studentPersonalData != null) {
          this.isStudentPersonalDetailsPresent = true;
          this.studentPersonalDetailsForm.patchValue({
            name: this.studentPersonalData.name,
            dateOfBirth: this.formatDateForForm(this.studentPersonalData.dateOfBirth),
            gender: this.studentPersonalData.gender,
            email: this.studentPersonalData.email,
            phoneNumber: this.studentPersonalData.phoneNumber
          });
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentPersonalDetailsForm.valid) {
      this.mapFormToStudentPersonalData(this.studentPersonalDetailsForm.value);

      if (this.isStudentPersonalDetailsPresent) {
        // Update API call
        this.studentPersonalData._id = this.personalId
        this.studentPersonalDetailsService.updateStudentPersonalData(this.studentPersonalData,this.studentPersonalData._id)
          .subscribe(response => {
            console.log('Data updated successfully:', response);
            localStorage.setItem('studentId', response._id);
            // Navigate to the next component, e.g., StudentAddressDetailsFormComponent
            this.router.navigate(['/studentUniversityRegistration/studentAddressDeatialsForm', response._id]);
          }, error => {
            console.error('Error updating data:', error);
          });
      } else {
        // Create API call if needed
        this.studentPersonalDetailsService.saveStudentPersonalData(this.studentPersonalData)
          .subscribe(response => {
            console.log('Data saved successfully:', response);
            localStorage.setItem('studentId', response._id);
            // Navigate to the next component, e.g., StudentAddressDetailsFormComponent
            this.router.navigate(['/studentUniversityRegistration/studentAddressDeatialsForm', response._id]);
          }, error => {
            console.error('Error saving data:', error);
          });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  private formatDateForForm(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
  }

  get formControls() {
    return this.studentPersonalDetailsForm.controls;
  }
}
