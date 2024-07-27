import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentCourse } from 'src/app/models/studentCourse.model';
import { StudentApplicationService } from 'src/app/services/student-application.service';

@Component({
  selector: 'app-student-course-selection',
  templateUrl: './student-course-selection.component.html',
  styleUrls: ['./student-course-selection.component.scss']
})
export class StudentCourseSelectionComponent implements OnInit {
  studentForm!: FormGroup;
  courses: string[] = []
  fee!:number;
  courseId!:string;
  courseName='';
  submitted = false;
  studentCourses!:StudentCourse[];
  constructor(
    private formBuilder: FormBuilder,
    private studentApplicationServices:StudentApplicationService
  ) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      course: [this.courseName, Validators.required],
    });
    this.fetchDropdownData()
  }

  fetchDropdownData() {
    //get courses 
    this.studentApplicationServices.getAllCourses().subscribe(data => {
      this.courses = data.map((course: any) => course.courseName);
      this.studentCourses=data;
      console.log(this.courses)
    }, error => {
      console.error('Error fetching college data:', error);
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

  getCourseNameByStudentId(){
    this.studentApplicationServices.getCourseIdByStudentId().subscribe(
      (id: string) => {
        this.courseId = id;
        console.log('Course ID:', this.courseId); 
        const selectedCourse = this.studentCourses.find(course => course.courseId === this.courseId);
        if (selectedCourse) {
          this.fee = selectedCourse.fee;
          this.courseName=selectedCourse.courseName;
        } else {
          console.log('Course not found');
        }
      },
      error => {
        console.error('Error fetching course ID:', error);
      }
    );
  }

  get f() { return this.studentForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted:');
  }
}
