import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [AuthComponent,MatIconModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  goToExternalSite() {
    window.location.href = 'https://devworksemployers.onrender.com/';
  }
  
}
