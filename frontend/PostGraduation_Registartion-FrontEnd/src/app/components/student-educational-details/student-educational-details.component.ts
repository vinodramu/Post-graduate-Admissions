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
  submitted = false;
  isStudentEducationPresent = false;
  studentEducationalForm!: FormGroup;
  studentEducationalData!: StudentEducationdata[];

  constructor(
    private formBuilder: FormBuilder,
    private studentEducationService: StudentEducationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentEducationalForm = this.formBuilder.group({
      degreeLevelOfEducation: [{ value: 'UnderGraduation', disabled: true }, Validators.required],
      degreeInstitution: ['', [Validators.required, Validators.minLength(2)]],
      degreeYearOfPassing: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      degreePercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      interLevelOfEducation: [{ value: 'Intermediate', disabled: true }, Validators.required],
      interInstitution: ['', [Validators.required, Validators.minLength(2)]],
      interYearOfPassing: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      interPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      sscLevelOfEducation: [{ value: 'SSC', disabled: true }, Validators.required],
      sscInstitution: ['', [Validators.required, Validators.minLength(2)]],
      sscYearOfPassing: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      sscPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    this.getEducationalDataByStudentId();
  }

  private mapFormToEducationData(formValue: any): StudentEducationdata[] {
    const educationDataList: StudentEducationdata[] = [];

    // SSC Data
    educationDataList.push({
      levelOfEducation: 'SSC',
      institution: formValue.sscInstitution,
      yearOfPassing: +formValue.sscYearOfPassing,
      percentage: +formValue.sscPercentage,
    });

    // Intermediate Data
    educationDataList.push({
      levelOfEducation: 'Intermediate',
      institution: formValue.interInstitution,
      yearOfPassing: +formValue.interYearOfPassing,
      percentage: +formValue.interPercentage,
    });

    // Degree Data
    educationDataList.push({
      levelOfEducation: 'UnderGraduation',
      institution: formValue.degreeInstitution,
      yearOfPassing: +formValue.degreeYearOfPassing,
      percentage: +formValue.degreePercentage,
    });

    return educationDataList;
  }

  getEducationalDataByStudentId() {
    this.studentEducationService.getEducationDetailsByStudentId().subscribe((data: StudentEducationdata[]) => {
      if (data && data.length > 0) {
        this.studentEducationalData = data;
        this.isStudentEducationPresent = true;

        // Populate form with retrieved data
        this.populateForm(data);
      }
    }, error => {
      console.error('Error fetching educational data:', error);
    });
  }

  private populateForm(data: StudentEducationdata[]) {
    // Assuming the data array is in the same order as the form fields
    const sscData = data.find(d => d.levelOfEducation === 'SSC');
    const interData = data.find(d => d.levelOfEducation === 'Intermediate');
    const degreeData = data.find(d => d.levelOfEducation === 'UnderGraduation');

    this.studentEducationalForm.patchValue({
      sscInstitution: sscData?.institution || '',
      sscYearOfPassing: sscData?.yearOfPassing || '',
      sscPercentage: sscData?.percentage || '',
      interInstitution: interData?.institution || '',
      interYearOfPassing: interData?.yearOfPassing || '',
      interPercentage: interData?.percentage || '',
      degreeInstitution: degreeData?.institution || '',
      degreeYearOfPassing: degreeData?.yearOfPassing || '',
      degreePercentage: degreeData?.percentage || '',
    });
  }

  get f() { return this.studentEducationalForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentEducationalForm.invalid) {
      return;
    }

    this.studentEducationalData = this.mapFormToEducationData(this.studentEducationalForm.value);
    if (this.isStudentEducationPresent) {
      // Update API
      this.studentEducationService.updateEducationalData(this.studentEducationalData)
        .subscribe(response => {
          console.log('Data updated successfully:', response);
          this.router.navigate(['/studentUniversityRegistration/studentCourseDeatialsForm']);
        }, error => {
          console.error('Error updating data:', error);
        });
    } else {
      this.studentEducationService.saveEducationalData(this.studentEducationalData)
        .subscribe(response => {
          console.log('Data saved successfully:', response);
          this.router.navigate(['/studentUniversityRegistration/studentCourseDeatialsForm']);
        }, error => {
          console.error('Error saving data:', error);
        });
    }
  }
}
