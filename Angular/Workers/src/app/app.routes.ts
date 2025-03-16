import { Routes } from '@angular/router';
import { FilteringComponent } from '../components/filtering/filtering.component';
import { NavbarComponent } from '../components/navbar/navbar.component';


export const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'filtering', component: FilteringComponent },

  ];

  