import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentApplicationCourseData } from 'src/app/models/studentApplicationCourseData.model';
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

  studentExamForm!: FormGroup;
  states = [];
  countries = [];
  boards = [];
  genders = ['male', 'female', 'others'];
  colleges: string[] = [];
  courses = [];
  centers = [];

  studentPersonalData!: StudentPersonalData;
  studentApplicationCourseData!: StudentApplicationCourseData;
  constructor(
    private fb: FormBuilder,
    private dropdownDataService: CommonService,
    private studentApplicationService: StudentApplicationService
  ) { }

  ngOnInit(): void {
    this.studentExamForm = this.fb.group({
      name: [`${localStorage.getItem('userName')}`, Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      email: [`${localStorage.getItem('userEmail')}`, [Validators.required, Validators.email]],
      phone_number: [`${localStorage.getItem('userPhone')}`, Validators.required],
      aadharno: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      degreeLevel: ['Graduation', Validators.required],
      degreeBoard: ['', Validators.required],
      degreeRoll_no: ['', Validators.required],
      degreeCollegeName: ['', Validators.required],
      degreeYop: ['', Validators.required],
      degreePercentage: ['', Validators.required],
      DegreeSpecialization: ['', Validators.required],
      DegreeCertificate: [null, Validators.required],
      InterLevel: ['InterMediate', Validators.required],
      InterBoardoard: ['', Validators.required],
      interRollNo: ['', Validators.required],
      interCollegeName: ['', Validators.required],
      interYop: ['', Validators.required],
      interPercentage: ['', Validators.required],
      interSpecialization: ['', Validators.required],
      interCertificate: [null, Validators.required],
      sscLevel: [{ value: 'SSC', disabled: true }],
      sscBoard: ['', Validators.required],
      sscRoll_no: ['', Validators.required],
      sscSchoolName: ['', Validators.required],
      sscYop: ['', Validators.required],
      sscPercentage: ['', Validators.required],
      sscCertificate: [null, Validators.required],
      college: ['', Validators.required],
      course: ['', Validators.required],
      center1: ['', Validators.required],
      center2: ['', Validators.required],
      adhar: [null, Validators.required],
      photo: [null, Validators.required],
      signature: [null, Validators.required]
    });

    this.fetchDropdownData();
  }

  fetchDropdownData() {
    // getColleges
    this.dropdownDataService.getColleges().subscribe(data => {
      this.colleges = data.map((college: any) => college.name);
    }, error => {
      console.error('Error fetching college data:', error);
    });
    // get countries
    this.dropdownDataService.getAllCountries().subscribe(data => {
      this.countries = data.map((country: any) => country.name);
    }, error => {
      console.error('Error fetching college data:', error);
    });
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.studentExamForm.patchValue({
        [controlName]: file
      });
      this.studentExamForm.get(controlName)?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.studentExamForm.valid) {
      this.mapFormToStudentPersonalData(this.studentExamForm)
      this.mapFormToStudentApplicationCoursedata(this.studentExamForm)
      this.studentApplicationService.saveStudentApplicationData(
        this.studentPersonalData,
         this.studentApplicationCourseData,
         this.studentExamForm.value.adhar,
         this.studentExamForm.value.photo,
         this.studentExamForm.value.signature,
         this.studentExamForm.value.DegreeCertificate,
         this.studentExamForm.value.interCertificate,
         this.studentExamForm.value.sscCertificate   
        ).subscribe(
          response => {
            console.log('API response:', response);
          },
          error => {
            console.error('Error:', error);
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }

  private mapFormToStudentPersonalData(formValue: any): void {
    this.studentPersonalData.name = formValue.name;
    this.studentPersonalData.date_of_birth = new Date(formValue.date_of_birth); // Convert string to Date
    this.studentPersonalData.gender = formValue.gender;
    this.studentPersonalData.email = formValue.email;
    this.studentPersonalData.phone_number = formValue.phone_number;
    this.studentPersonalData.aadharno = formValue.aadharno;
    this.studentPersonalData.address = formValue.address;
    this.studentPersonalData.state = formValue.state;
    this.studentPersonalData.country = formValue.country;
    this.studentPersonalData.pincode = formValue.pincode;
    this.studentPersonalData.country = formValue.country;
    this.studentPersonalData.education = this.mapFormToEducationData(formValue);
  }

  private mapFormToStudentApplicationCoursedata(formValue: any): void {
    this.studentApplicationCourseData.colleges = formValue.college;
    this.studentApplicationCourseData.course_name = formValue.course;
    this.studentApplicationCourseData.city_preference1 = formValue.center1;
    this.studentApplicationCourseData.city_preference2 = formValue.center2;
    this.studentApplicationCourseData.fee = +3000;
  }

  private mapFormToEducationData(formValue: any): StudentEducationdata[] {
    const educationDataList: StudentEducationdata[] = [];

    // Degree Data
    educationDataList.push({
      level: formValue.degreeLevel,
      board: formValue.degreeBoard,
      roll_no: formValue.degreeRoll_no,
      school_college_name: formValue.degreeCollegeName,
      year_of_passing: +formValue.degreeYop, // Convert to number
      percentage_cgpa: +formValue.degreePercentage, // Convert to number
      specialization: formValue.DegreeSpecialization
    });

    // Intermediate Data
    educationDataList.push({
      level: formValue.InterLevel,
      board: formValue.InterBoard,
      roll_no: formValue.interRollNo,
      school_college_name: formValue.interCollegeName,
      year_of_passing: +formValue.interYop, // Convert to number
      percentage_cgpa: +formValue.interPercentage, // Convert to number
      specialization: formValue.interSpecializatio
    });

    // SSC Data
    educationDataList.push({
      level: formValue.sscLevel,
      board: formValue.sscBoard,
      roll_no: formValue.sscRoll_no,
      school_college_name: formValue.sscSchoolName,
      year_of_passing: +formValue.sscYop, // Convert to number
      percentage_cgpa: +formValue.sscPercentage, // Convert to number
      specialization: '' // SSC usually doesn't have specialization
    });

    return educationDataList;
  }

  onCollegeChange(event: Event): void {
    const selectedCollege = (event.target as HTMLSelectElement).value;
    this.dropdownDataService.getCoursesByCollegeNaame(selectedCollege).subscribe(
      data => {
        this.courses = data.map((course:any) => course.name);
      },
      error => {
        console.error('Error fetching college data:', error);
      }
    );
  }

}
