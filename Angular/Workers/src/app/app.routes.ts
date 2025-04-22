import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guard/auth.guard';
import { JobListComponent } from '../components/job-list/job-list.component';
import { FilteringComponent } from '../components/filtering/filtering.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'joblist', component: JobListComponent },
    { path: 'filtering', component: FilteringComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    // { path: 'jobs', component: FilteringComponent },
    // { path: 'job/:id', component: JobDetailsComponent }
  ];

  