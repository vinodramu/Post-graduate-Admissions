import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { SuperAdminLoginComponent } from './login/super-admin-login/super-admin-login.component';
import { ExaminationLoginComponent } from './login/examination-login/examination-login.component';
import { ChairpersonLoginComponent } from './login/chairperson-login/chairperson-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

const routes: Routes = [
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'superAdminLogin', component: SuperAdminLoginComponent },
  { path: 'examinationLogin', component: ExaminationLoginComponent },
  { path: 'chairpersonLogin', component: ChairpersonLoginComponent },
  { path: '', component: HomeComponent }
=======
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { PaymetComponent } from './components/paymet/paymet.component';
import { ExamApplicationComponent } from './components/exam-application/exam-application.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'student',component:StudentComponent},
  {path:'payment',component:PaymetComponent},
  { path: 'exam-application', component: ExamApplicationComponent },
>>>>>>> a1822e628b65b3a505b0523de0e8e7d7507ea785
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
