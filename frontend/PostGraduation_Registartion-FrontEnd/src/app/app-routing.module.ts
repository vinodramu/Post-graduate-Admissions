import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { PaymetComponent } from './components/paymet/paymet.component';
import { ExamApplicationComponent } from './components/exam-application/exam-application.component';
import { StudentPersonalDetailsComponent } from './components/student-personal-details/student-personal-details.component';
import { StudentAddressDetailsComponent } from './components/student-address-details/student-address-details.component';
import { StudentEducationalDetailsComponent } from './components/student-educational-details/student-educational-details.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'student',component:StudentComponent},
  {path:'payment',component:PaymetComponent},
  { path: 'exam-application', component: ExamApplicationComponent },
  { path: 'studentPersonalDeatialsForm', component: StudentPersonalDetailsComponent },
  { path: 'studentAddressDeatialsForm', component: StudentAddressDetailsComponent },
  { path: 'studentEducationalDeatialsForm', component: StudentEducationalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
