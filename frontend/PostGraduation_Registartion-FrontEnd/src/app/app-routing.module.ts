import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
