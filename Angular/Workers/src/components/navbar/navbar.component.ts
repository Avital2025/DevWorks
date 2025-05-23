import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AuthComponent, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;

  goToExternalSite() {
    window.open('https://devworksemployers.onrender.com/', '_blank');
}



scrollToContact() {
  const element = document.getElementById('footerSection');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
