import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentAddress } from 'src/app/models/studentAddress.model';
import { StudentCourse } from 'src/app/models/studentCourse.model';
import { StudentDocumentData } from 'src/app/models/studentDocumentData.model';
import { StudentEducationdata } from 'src/app/models/studentEducatioData.model';
import { StudentPersonalData } from 'src/app/models/studentPersonalData.model';
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
  cities: string[] = [];
  pincodes: string[] = [];
  courses: string[] = []
  fee!:number;
  courseId!:string;
  submitted = false;
  studentCourses!:StudentCourse[];
  studentPersonalData!:StudentPersonalData;
  studentAddress!:StudentAddress;
  studentCourseData!:StudentCourse;
  studentEducationalData!:StudentEducationdata[];
  studentDocumentData!:StudentDocumentData;
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
    this.commonService.getCountries().subscribe(data => {
      this.countries = data.map((country: any) => country.name);
    }, error => {
      console.error('Error fetching college data:', error);
    });
    //get courses 
    this.studentApplicationServices.getAllCourses().subscribe(data => {
      this.courses = data.map((course: any) => course.courseName);
      this.studentCourses=data;
      console.log(this.courses)
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
    const selectedCourseName = target.value;
    const selectedCourse = this.studentCourses.find(course => course.courseName === selectedCourseName);
    if (selectedCourse) {
      this.fee = selectedCourse.fee;
      this.courseId=selectedCourse.courseId;
    } else {
      console.log('Course not found');
    }
  }

  private mapFormToStudentPersonalData(formValue: any): void {
    this.studentPersonalData.name = formValue.name;
    this.studentPersonalData.dateOfBirth = new Date(formValue.date_of_birth); 
    this.studentPersonalData.gender = formValue.gender;
    this.studentPersonalData.email = formValue.email
  }

  private mapFormToStudentAddressData(formValue: any): void{
    this.studentAddress.correspondenseAddress=formValue.correspondenseAddress;
    this.studentAddress.permanentAddress=formValue.permanentAddress;
    this.studentAddress.state=formValue.state;
    this.studentAddress.city=formValue.city;
    this.studentAddress.pincode=formValue.pincode;
    this.studentAddress.country=formValue.country;
  }

  private mapFormToStudentCourseData(): void{
    this.studentCourseData.courseId=this.courseId;
    this.studentCourseData.fee=this.fee;
  }

  private mapFormToEducationData(formValue: any): StudentEducationdata[] {
    const educationDataList: StudentEducationdata[] = [];

    // Degree Data
    educationDataList.push({
      levelOfEducation: formValue.degreeLevelOfEducation,
      institution: formValue.degreeInstitution,
      yearOfPassing: +formValue.degreeYearOfPassing, // Convert to number
      percentage: +formValue.degreePercentage, // Convert to number
    });

    // Intermediate Data
    educationDataList.push({
      levelOfEducation: formValue.interLevelOfEducation,
      institution: formValue.interInstitution,
      yearOfPassing: +formValue.interYearOfPassing, // Convert to number
      percentage: +formValue.interPercentage, // Convert to number
    });

    // SSC Data
    educationDataList.push({
      levelOfEducation: formValue.sscLevelOfEducation,
      institution: formValue.sscInstitution,
      yearOfPassing: +formValue.sscYearOfPassing, // Convert to number
      percentage: +formValue.sscPercentage, // Convert to number
    });

    return educationDataList;
  }
  get f() { return this.studentForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
