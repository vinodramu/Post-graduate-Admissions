import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SuperAdminLoginComponent } from './login/super-admin-login/super-admin-login.component';
import { ExaminationLoginComponent } from './login/examination-login/examination-login.component';
import { ChairpersonLoginComponent } from './login/chairperson-login/chairperson-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

=======
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
>>>>>>> a1822e628b65b3a505b0523de0e8e7d7507ea785
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    SuperAdminLoginComponent,
    ExaminationLoginComponent,
    ChairpersonLoginComponent,
    AdminLoginComponent
=======
    UserComponent,
    StudentComponent,
    PaymetComponent,
    ExamApplicationComponent,  
>>>>>>> a1822e628b65b3a505b0523de0e8e7d7507ea785
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule
=======
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
>>>>>>> a1822e628b65b3a505b0523de0e8e7d7507ea785
  ],
  providers: [ { provide: Environment, useClass: Environment}],
  bootstrap: [AppComponent]
})
export class AppModule { }
