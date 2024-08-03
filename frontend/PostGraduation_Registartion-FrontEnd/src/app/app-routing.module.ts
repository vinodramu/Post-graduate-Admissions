import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { PaymetComponent } from './components/paymet/paymet.component';
import { ExamApplicationComponent } from './components/exam-application/exam-application.component';
import { StudentPersonalDetailsComponent } from './components/student-personal-details/student-personal-details.component';
import { StudentAddressDetailsComponent } from './components/student-address-details/student-address-details.component';
import { StudentEducationalDetailsComponent } from './components/student-educational-details/student-educational-details.component';
import { StudentCourseSelectionComponent } from './components/student-course-selection/student-course-selection.component';
import { StudentDocumentDetailsComponent } from './components/student-document-details/student-document-details.component';
import { StudentUniversityRegistrationComponent } from './components/student-university-registration/student-university-registration.component';
import { StudentReportComponent } from './components/superAdmin/student-report/student-report.component';
import { AdminLoginComponent } from './components/login/admin-login/admin-login.component';
import { SuperAdminLoginComponent } from './components/login/super-admin-login/super-admin-login.component';
import { ExaminationLoginComponent } from './components/login/examination-login/examination-login.component';
import { ChairpersonLoginComponent } from './components/login/chairperson-login/chairperson-login.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [

  
  { path: 'admin-dashboard', component: StudentReportComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'superAdminLogin', component: SuperAdminLoginComponent },
  { path: 'examinationLogin', component: ExaminationLoginComponent },
  { path: 'chairpersonLogin', component: ChairpersonLoginComponent },
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'student', component: StudentComponent },
  { path: 'payment', component: PaymetComponent },
  { path: 'exam-application', component: ExamApplicationComponent },
  { path: 'studentPersonalDeatialsForm', component: StudentPersonalDetailsComponent },
  { path: 'studentPersonalDetailsForm/:PersonalId', component: StudentPersonalDetailsComponent },
  { path: 'studentAddressDeatialsForm', component: StudentAddressDetailsComponent },
  { path: 'studentAddressDeatialsForm/:PersonalId', component: StudentAddressDetailsComponent },
  { path: 'studentEducationalDeatialsForm', component: StudentEducationalDetailsComponent },
  { path: 'studentCourseDeatialsForm', component: StudentCourseSelectionComponent },
  { path: 'studentDocumentForm', component: StudentDocumentDetailsComponent },
  { path: 'studentReport', component: StudentReportComponent },

  {
    path: 'studentUniversityRegistration', component: StudentUniversityRegistrationComponent, children: [
      { path: 'studentPersonalDeatialsForms/:PersonalId', component: StudentPersonalDetailsComponent },
      { path: 'studentPersonalDeatialsForm', component: StudentPersonalDetailsComponent },
      { path: 'studentAddressDeatialsForms/:PersonalId', component: StudentAddressDetailsComponent },
      { path: 'studentAddressDeatialsForm', component: StudentAddressDetailsComponent },
      { path: 'studentEducationalDeatialsForms/:PersonalId', component: StudentEducationalDetailsComponent },
      { path: 'studentEducationalDeatialsForm', component: StudentEducationalDetailsComponent },
      { path: 'studentCourseDeatialsForms/:PersonalId', component: StudentCourseSelectionComponent },
      { path: 'studentCourseDeatialsForm', component: StudentCourseSelectionComponent },
      { path: 'studentDocumentForm', component: StudentDocumentDetailsComponent },
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
