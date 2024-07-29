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
import { HomeComponent } from './components/home/home.component';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    StudentComponent,
    PaymetComponent,
    ExamApplicationComponent,
    StudentPersonalDetailsComponent,
    StudentAddressDetailsComponent,
    StudentEducationalDetailsComponent,
    StudentCourseSelectionComponent,
    StudentDocumentDetailsComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [ { provide: Environment, useClass: Environment}],
  bootstrap: [AppComponent]
})
export class AppModule { }
