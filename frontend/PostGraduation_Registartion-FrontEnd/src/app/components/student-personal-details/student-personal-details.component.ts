import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private studentPersonaldetailService: StudentPersonalDetailsService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit() {
    // Retrieve PersonalId from route parameters as a string
    const personalId = this.route.snapshot.paramMap.get('PersonalId')!;
    
    // Fetch personal details based on PersonalId
    if (personalId) {
      this.fetchStudentPersonalDetailsByPersonalId(personalId);
    } else {
      // Handle case when PersonalId is not available
      console.error('PersonalId is not provided.');
    }

    this.studentPersonalDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
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

  fetchStudentPersonalDetailsByPersonalId(PersonalId: string): void {
    this.studentPersonaldetailService.getStudentPersonalDetailsByPersonalId(PersonalId)
      .subscribe((data: StudentPersonalData) => {
        this.studentPersonalData = data;
        if (this.studentPersonalData) {
          this.isStudentPersonalDetailsPresent = true;
          // Populate form with fetched data
          this.studentPersonalDetailsForm.patchValue(this.studentPersonalData);
        } else {
          console.error('No data found for the given PersonalId.');
        }
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  onSubmit(): void {
    if (this.studentPersonalDetailsForm.valid) {
      this.submitted = true;
      this.mapFormToStudentPersonalData(this.studentPersonalDetailsForm.value);
      
      if (!this.isStudentPersonalDetailsPresent) {
        // Handle new entry
        this.studentPersonaldetailService.saveStudentPersonalData(this.studentPersonalData)
          .subscribe(response => {
            console.log('Data saved successfully:', response);
            localStorage.setItem('studentId', response._id);
            this.router.navigate(['/studentAddressDeatialsForm']);
          }, error => {
            console.error('Error saving data:', error);
          });
      } else {
        // Update existing entry
        this.studentPersonaldetailService.saveStudentPersonalData(this.studentPersonalData)
          .subscribe(response => {
            console.log('Data updated successfully:', response);
            localStorage.setItem('studentId', response._id);
            this.router.navigate(['/studentAddressDeatialsForm']);
          }, error => {
            console.error('Error updating data:', error);
          });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
