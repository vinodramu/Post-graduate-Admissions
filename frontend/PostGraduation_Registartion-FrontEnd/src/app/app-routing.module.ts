import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { StudentComponent } from './student/student.component';
import { PaymetComponent } from './paymet/paymet.component';
import { ExamApplicationComponent } from './exam-application/exam-application.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'student',component:StudentComponent},
  {path:'payment',component:PaymetComponent},
  { path: 'exam-application', component: ExamApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
