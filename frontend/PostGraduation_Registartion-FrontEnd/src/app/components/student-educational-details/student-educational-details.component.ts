import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentEducationdata } from 'src/app/models/studentEducatioData.model';

@Component({
  selector: 'app-student-educational-details',
  templateUrl: './student-educational-details.component.html',
  styleUrls: ['./student-educational-details.component.scss']
})
export class StudentEducationalDetailsComponent implements OnInit {
  submitted=false;
  studentEducationalForm!: FormGroup;
  studentEducationalData!:StudentEducationdata[];
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.studentEducationalForm = this.formBuilder.group({
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
    });
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
  get f() { return this.studentEducationalForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
