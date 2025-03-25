import { Routes } from '@angular/router';
import { FilteringComponent } from '../components/filtering/filtering.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guard/auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'filtering', component: FilteringComponent },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'jobs', component: FilteringComponent },
    // { path: 'job/:id', component: JobDetailsComponent }
  ];

  