import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatableComponent } from './matable/matable.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateContestComponent } from './create-contest/create-contest.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'leaderboard', component: MatableComponent},
  { path: 'newcontest', component: CreateContestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }