import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { PaymetComponent } from './components/paymet/paymet.component';
import { ExamApplicationComponent } from './components/exam-application/exam-application.component';
import { Environment } from './environment';
import { StudentPersonalDetailsComponent } from './components/student-personal-details/student-personal-details.component';
import { StudentAddressDetailsComponent } from './components/student-address-details/student-address-details.component';
import { StudentEducationalDetailsComponent } from './components/student-educational-details/student-educational-details.component';
import { StudentCourseSelectionComponent } from './components/student-course-selection/student-course-selection.component';
import { StudentDocumentDetailsComponent } from './components/student-document-details/student-document-details.component';
import { MatTabsModule } from '@angular/material/tabs'
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentUniversityRegistrationComponent } from './components/student-university-registration/student-university-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabGroupComponent } from './components/student-university-registration/tab-group/tab-group.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SuperAdminLoginComponent } from './components/login/super-admin-login/super-admin-login.component';
import { ExaminationLoginComponent } from './components/login/examination-login/examination-login.component';
import { ChairpersonLoginComponent } from './components/login/chairperson-login/chairperson-login.component';
import { AdminLoginComponent } from './components/login/admin-login/admin-login.component';
import { StudentReportComponent } from './components/superAdmin/student-report/student-report.component';
import { EditStudentComponent } from './components/superAdmin/student-report/edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuperAdminLoginComponent,
    ExaminationLoginComponent,
    ChairpersonLoginComponent,
    AdminLoginComponent,
    UserComponent,
    StudentComponent,
    PaymetComponent,
    ExamApplicationComponent,  
    ExamApplicationComponent,
    StudentPersonalDetailsComponent,
    StudentAddressDetailsComponent,
    StudentEducationalDetailsComponent,
    StudentCourseSelectionComponent,
    StudentDocumentDetailsComponent, 
    StudentReportComponent,
    StudentUniversityRegistrationComponent,
    TabGroupComponent,
    HeaderComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    AgGridModule,
    RouterModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: Environment, useClass: Environment}],
  bootstrap: [AppComponent]
})
export class AppModule { }
