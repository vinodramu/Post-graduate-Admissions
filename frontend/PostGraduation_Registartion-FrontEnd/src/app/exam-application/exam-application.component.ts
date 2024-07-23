import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-application',
  templateUrl: './exam-application.component.html',
  styleUrls: ['./exam-application.component.scss']
})
export class ExamApplicationComponent implements OnInit {
  examForm: FormGroup;
  applications: any[] = [];
  selectedApplication: any = null;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      name: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      caste: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      degreeName: ['', Validators.required],
      yearOfPassing: ['', Validators.required],
      cgpa: ['', Validators.required],
      hallTicketNumber: ['', Validators.required],
      degreeCertificate: [null, Validators.required],
      photo: [null, Validators.required],
      signature: [null, Validators.required],
      city1: ['', Validators.required],
      city2: ['', Validators.required],
      city3: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log();  
  }

  get f() { return this.examForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.examForm.invalid) {
      return;
    }

    if (this.selectedApplication) {
      // Update application
      const updatedApplications = this.applications.map(app =>
        app.id === this.selectedApplication.id ? { ...this.examForm.value, id: this.selectedApplication.id } : app
      );
      this.applications = updatedApplications;
    } else {
      // Add new application
      this.applications.push({ ...this.examForm.value, id: Date.now() });
    }

    // Reset form
    this.examForm.reset();
    this.selectedApplication = null;
    this.submitted = false;
  }

  onEdit(app: any) {
    this.selectedApplication = app;
    this.examForm.patchValue(app);
  }

  onDelete(id: number) {
    this.applications = this.applications.filter(app => app.id !== id);
  }

  onCancel() {
    this.examForm.reset();
    this.selectedApplication = null;
    this.submitted = false;
  }
}
