import { Routes } from '@angular/router';
import { FilteringComponent } from '../components/filtering/filtering.component';
import { HomeComponent } from '../components/home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'filtering', component: FilteringComponent },

  ];

  