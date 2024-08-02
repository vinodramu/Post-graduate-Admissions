import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourse } from 'src/app/models/studentCourse.model';
import { StudentApplicationService } from 'src/app/services/student-application.service';

@Component({
  selector: 'app-student-course-selection',
  templateUrl: './student-course-selection.component.html',
  styleUrls: ['./student-course-selection.component.scss']
})
export class StudentCourseSelectionComponent implements OnInit {
  studentCourseForm!: FormGroup;
  courses: string[] = [];
  studentCourses!: StudentCourse[];
  totalFee: number = 0;
  studentId!: string;
  selectedCourses: string[] = [];
  dropdownOpen: boolean = false;
  isCoursesExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentApplicationServices: StudentApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.studentCourseForm = this.formBuilder.group({
      selectedCourses: [[], Validators.required]
    });
    this.studentId = localStorage.getItem('studentId') as string;
    this.fetchDropdownData();
    
    this.studentCourseForm.get('selectedCourses')?.valueChanges.subscribe(() => {
      this.calculateTotalFee();
    });

    this.route.paramMap.subscribe(params => {
      
      const personalId = params.get('PersonalId');
      if (personalId) {
        this.isCoursesExist = true;
        this. loadExistingData(personalId);
      } else {
        console.error('No PersonalId provided in route');
      }
    });
  
  }

  
  fetchDropdownData() {
    this.studentApplicationServices.getAllCourses().subscribe(data => {
      this.courses = data.map((course: any) => course.courseName);
      this.studentCourses = data;
    }, error => {
      console.error('Error fetching college data:', error);
    });
  }

  calculateTotalFee() {
    this.totalFee = this.selectedCourses.reduce((acc: number, courseId: string) => {
      const selectedCourse = this.studentCourses.find(course => course.courseId === courseId);
      return acc + (selectedCourse?.fee || 0);
    }, 0);
  }

  loadExistingData(personalId: string) {
    this.studentApplicationServices.getApplicationByStudentId(personalId).subscribe(data => {
      if (data && data.application) {
        const existingCourses = data.application.map((courseData: any) => {
          const selectedCourse = this.studentCourses.find(course => course.courseId === courseData.courseId);
          return selectedCourse?.courseName;
        }).filter((courseName: any): courseName is string => !!courseName); // Filter out undefined values

        this.selectedCourses = existingCourses;
        this.calculateTotalFee();
        this.isCoursesExist = existingCourses.length > 0; // Set isCoursesExist based on existing courses
        this.studentCourseForm.patchValue({ selectedCourses: this.selectedCourses });
      }
    }, error => {
      console.error('Error loading existing data:', error);
    });
  }

  onCourseChange(event: any) {
    const courseName = event.target.value as string;
    if (event.target.checked) {
      if (!this.selectedCourses.includes(courseName)) {
        this.selectedCourses.push(courseName);
      }
    } else {
      this.selectedCourses = this.selectedCourses.filter(name => name !== courseName);
    }
    this.studentCourseForm.patchValue({ selectedCourses: this.selectedCourses });
    this.calculateTotalFee();
  }

  isCourseSelected(courseName: string): boolean {
    return this.selectedCourses.includes(courseName);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSubmit() {
    // Mark all form controls as touched to trigger validation messages
    this.studentCourseForm.markAllAsTouched();
  
    // Stop if form is invalid
    if (this.studentCourseForm.invalid) {
      return;
    }
  
    // Get the selected courses from the form
    const selectedCoursesData = this.studentCourseForm.get('selectedCourses')?.value;
    console.log(selectedCoursesData)
  
    // Ensure the selectedCoursesData is an array of strings
    if (!Array.isArray(selectedCoursesData)) {
      console.error('selectedCoursesData is not an array');
      return;
    }
  
    // Convert form data to the expected format for API
    const application = selectedCoursesData.map((courses: string) => {
      const selectedCourse = this.studentCourses.find(course => course.courseName === courses);
  
      // Handle the case where the course is not found
      if (!selectedCourse) {
        console.error(`Course not found: ${courses}`);
        return null;
      }
  
      return {
        courseId: selectedCourse.courseId,
      };
    }).filter((application): application is { courseId: string } => application !== null); // Filter out null entries and assert type
  
    // Construct the request body
    const requestBody = {
      studentId: this.studentId,
      application: application
    };
  
    // Send the formatted request body
    if (this.isCoursesExist) {
      this.studentApplicationServices.updateCoursesByCourseId(requestBody).subscribe(
        response => {
          console.log('Courses updated successfully:', response);
          this.router.navigate(['/studentUniversityRegistration/studentDocumentForm']);
        },
        error => {
          console.error('Error updating courses:', error);
        }
      );
    } else {
      this.studentApplicationServices.saveSelectedCourses(requestBody).subscribe(
        response => {
          console.log('Data saved successfully:', response);
          this.router.navigate(['/studentUniversityRegistration/studentDocumentForm']);
        },
        error => {
          console.error('Error saving data:', error);
        }
      );
    }
  }
}
