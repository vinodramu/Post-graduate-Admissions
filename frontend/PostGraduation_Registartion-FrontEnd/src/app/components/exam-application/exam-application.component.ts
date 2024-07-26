import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentCourse } from 'src/app/models/studentCourse.model';
import { CommonService } from 'src/app/services/common.service';
import { StudentApplicationService } from 'src/app/services/student-application.service';

@Component({
  selector: 'app-exam-application',
  templateUrl: './exam-application.component.html',
  styleUrls: ['./exam-application.component.scss']
})
export class ExamApplicationComponent implements OnInit {
  studentForm!: FormGroup;
  currentSection = 'personal';
  genders = ['Male', 'Female', 'Other'];
  countries = [];
  states: string[] = [];
  cities = ['State1', 'State2', 'State3'];
  pincodes = ['Board1', 'Board2', 'Board3'];
  courses: string[] = []
  fee=10;
  submitted = false;
  studentCourses!:StudentCourse[];
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentApplicationServices:StudentApplicationService
  ) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      name: [`${localStorage.getItem('userName')}`, Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: [`${localStorage.getItem('userEmail')}`, [Validators.required, Validators.email]],
      phoneNumber: [`${localStorage.getItem('userPhone')}`, Validators.required],
      permanentAddress: ['', Validators.required],
      correspondenseAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      college: ['', Validators.required],
      course: ['', Validators.required],
      degreeLevelOfEducation: [{ value: 'UnderGraduation', disabled: true }, Validators.required],
      degreeInstitution: ['', Validators.required],
      degreeYearOfPassing: ['', Validators.required],
      degreePercentage: ['', Validators.required],
      interLevelOfEducation: [{ value: 'Intermediate', disabled: true }, Validators.required],
      interInstitution: ['', Validators.required],
      interYearOfPassing: ['', Validators.required],
      interPercentage: ['', Validators.required],
      sscLevelOfEducation: [{ value: 'SSC', disabled: true }, Validators.required],
      sscInstitution: ['', Validators.required],
      sscYearOfPassing: ['', Validators.required],
      sscPercentage: ['', Validators.required],
      aadharPhoto: [null, Validators.required],
      studentPhoto: [null, Validators.required],
      signature: [null, Validators.required],
      graduationCertificate: [null, Validators.required],
      twelthCertificate: [null, Validators.required],
      tenthCertificate: [null, Validators.required],
    });
    this.fetchDropdownData()
  }

  // app.component.ts (or your relevant component file)
  nextSection() {
    if (this.currentSection === 'personal') {
      this.currentSection = 'address';
    } else if (this.currentSection === 'address') {
      this.currentSection = 'educational';
    } else if (this.currentSection === 'educational') {
      this.currentSection = 'course'; // New section
    } else if (this.currentSection === 'course') {
      this.currentSection = 'document';
    } else if (this.currentSection === 'document') {
      this.currentSection = 'final';
    }
  }


  // app.component.ts (or your relevant component file)
  previousSection() {
    if (this.currentSection === 'address') {
      this.currentSection = 'personal';
    } else if (this.currentSection === 'educational') {
      this.currentSection = 'address';
    } else if (this.currentSection === 'course') { // New section
      this.currentSection = 'educational';
    } else if (this.currentSection === 'document') {
      this.currentSection = 'course';
    } else if (this.currentSection === 'final') {
      this.currentSection = 'document';
    }
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.studentForm.patchValue({
        [controlName]: file
      });
    }
  }

  fetchDropdownData() {
    // get countries
    this.commonService.getAllCountries().subscribe(data => {
      this.countries = data.map((country: any) => country.name);
    }, error => {
      console.error('Error fetching college data:', error);
    });
    //get courses 
    this.studentApplicationServices.getAllCourses().subscribe(data => {
      this.studentCourses=data;
      console.log(this.studentCourses)
      this.courses = data.map((course: StudentCourse) =>{ course.courseName});
    }, error => {
      console.error('Error fetching college data:', error);
    });
  }

  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCountry = target.value;

    this.commonService.getStatesByCountry(selectedCountry).subscribe(state => {
      this.states = state;
      console.log('States:', this.states);
    });
  }
  onCourseChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCourse = target.value;
  }
  get f() { return this.studentForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
