import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentReportService } from 'src/app/service/student-report.service';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit{

  editForm: FormGroup;
  studentId: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private reportService: StudentReportService
  ) { 
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      admission_date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    const student = this.reportService.getStudentById(this.studentId);
    if (student) {
      this.editForm.patchValue(student);
    }
  }

  saveStudent(): void {
    if (this.editForm.valid) {
      this.reportService.updateStudent(this.studentId, this.editForm.value);
      this.router.navigate(['/']);
    }
  }
  cancel(): void {
    this.router.navigate(['/']);
  }
}
