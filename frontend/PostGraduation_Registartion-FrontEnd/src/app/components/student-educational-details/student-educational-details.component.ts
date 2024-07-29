import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentEducationdata } from 'src/app/models/studentEducatioData.model';
import { StudentEducationService } from 'src/app/services/student-education.service';

@Component({
  selector: 'app-student-educational-details',
  templateUrl: './student-educational-details.component.html',
  styleUrls: ['./student-educational-details.component.scss']
})
export class StudentEducationalDetailsComponent implements OnInit {
  submitted=false;
  isStudentEducationPresent!:boolean;
  studentEducationalForm!: FormGroup;
  studentEducationalData!:StudentEducationdata[];
  constructor(
    private formBuilder: FormBuilder,
    private studentEducationService:StudentEducationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.studentEducationalForm = this.formBuilder.group({
      degreeLevelOfEducation: [{ value: 'UnderGraduation', disabled: true }, Validators.required],
      degreeInstitution: [ '', Validators.required],
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
    });
  }

  private mapFormToEducationData(formValue: any): StudentEducationdata[] {
    const educationDataList: StudentEducationdata[] = [];

    // SSC Data
    educationDataList.push({
      levelOfEducation: 'SSC',
      institution: formValue.sscInstitution,
      yearOfPassing: +formValue.sscYearOfPassing, // Convert to number
      percentage: +formValue.sscPercentage, // Convert to number
    });

    // Intermediate Data
    educationDataList.push({
      levelOfEducation: 'Inter',
      institution: formValue.interInstitution,
      yearOfPassing: +formValue.interYearOfPassing, // Convert to number
      percentage: +formValue.interPercentage, // Convert to number
    });

    // Degree Data
    educationDataList.push({
      levelOfEducation: 'UnderGraduation',
      institution: formValue.degreeInstitution,
      yearOfPassing: +formValue.degreeYearOfPassing, // Convert to number
      percentage: +formValue.degreePercentage, // Convert to number
    });


    return educationDataList;
  }
  getEducationalDataByStudentId(){
    //
    this.studentEducationService.getEducationDetailsByStudentId().subscribe((data: StudentEducationdata[]) => {
      this.studentEducationalData = data;
      if (this.studentEducationalData!=null) {
        this.isStudentEducationPresent=true;
      } 
    });
  }

  get f() { return this.studentEducationalForm.controls; }

  onSubmit(): void {
    if (this.studentEducationalForm.valid) {
      this.submitted = true;
      this.studentEducationalData=this.mapFormToEducationData(this.studentEducationalForm.value);
      if(this.isStudentEducationPresent){
        // updtae API
      }else{
      this.studentEducationService.saveEducationalData(this.studentEducationalData)
        .subscribe(response => {
          console.log('Data saved successfully:', response);
          this.router.navigate(['/studentCourseDeatialsForm']);
        }, error => {
          console.error('Error saving data:', error);
        });
    }}else {
      console.log('Form is invalid');
    }
  }
}
