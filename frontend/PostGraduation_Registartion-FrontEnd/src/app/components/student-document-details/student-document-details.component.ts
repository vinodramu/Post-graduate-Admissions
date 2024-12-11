import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDocuments } from 'src/app/models/studentDocument.model';
import { StudentDocumentData } from 'src/app/models/studentDocumentData.model';
import { CommonService } from 'src/app/services/common.service';
import { StudentApplicationService } from 'src/app/services/student-application.service';
import { StudentDocumentService } from 'src/app/services/student-document.service';

@Component({
  selector: 'app-student-document-details',
  templateUrl: './student-document-details.component.html',
  styleUrls: ['./student-document-details.component.scss']
})
export class StudentDocumentDetailsComponent implements OnInit {
  studentDocumentForm!: FormGroup;
  submitted = false;
  studentDocumentData!:StudentDocumentData;
  constructor(
    private formBuilder: FormBuilder,
    private studentDocumentService: StudentDocumentService
  ) { }

  ngOnInit() {
    this.studentDocumentForm = this.formBuilder.group({
      aadharPhoto: [null, Validators.required],
      studentPhoto: [null, Validators.required],
      signature: [null, Validators.required],
      graduationCertificate: [null, Validators.required],
      twelthCertificate: [null, Validators.required],
      tenthCertificate: [null, Validators.required],
    });
    console.log("he")
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.studentDocumentForm.patchValue({
        [controlName]: file
      });
    }
  }

  private mapFormToStudentDocuments(): StudentDocuments {
    const formValues = this.studentDocumentForm.value;

    return {
      aadharPhoto: formValues.aadharPhoto,
      studentPhoto: formValues.studentPhoto,
      signature: formValues.signature,
      graduationCertificate: formValues.graduationCertificate,
      twelthCertificate: formValues.twelthCertificate,
      tenthCertificate: formValues.tenthCertificate
    };
  }
  get f() { return this.studentDocumentForm.controls; }



  onSubmit() {
    this.submitted = true;
    if (this.studentDocumentForm.valid) {
      this.submitted = true;
      this.studentDocumentData = this.mapFormToStudentDocuments();
      const formData = new FormData();
      Object.keys(this.studentDocumentForm.controls).forEach(controlName => {
      const file = this.studentDocumentForm.get(controlName)?.value;
      if (file) {
        formData.append(controlName, file);
      }
    });

    this.studentDocumentService.uploadFiles(localStorage.getItem('studentId') as string,formData).subscribe(response => {
      console.log('Files uploaded successfully:', response);
    }, error => {
      console.error('File upload error:', error);
    });

    }
  }
}
