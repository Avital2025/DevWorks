import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [NavbarComponent,MatIconModule,RouterModule,NavbarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {
  isLogin: boolean = false; // במידה וצריך לנהל את מצב ההתחברות של המשתמש
  constructor(private router: Router) {}

  // goToLogin() {
  //   this.router.navigate(['/login']);
  // }

  // goToAbout() {
  //   this.router.navigate(['/about']);
  // }

  // goToBrowseJobs() {
  //   this.router.navigate(['/jobs']);
  // }
}
