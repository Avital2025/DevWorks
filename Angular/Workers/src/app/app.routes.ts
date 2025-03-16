import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { FilteringComponent } from '../components/filtering/filtering.component';


export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'filtering', component: FilteringComponent },

  ];

  