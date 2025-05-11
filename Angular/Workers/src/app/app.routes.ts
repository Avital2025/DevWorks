import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { JobListComponent } from '../components/job-list/job-list.component';
import { FilteringComponent } from '../components/filtering/filtering.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'joblist', component: JobListComponent },
    { path: 'filtering', component: FilteringComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },  
  ];


