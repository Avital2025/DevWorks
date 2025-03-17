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

  constructor(private router:Router) { }

  // goToExtgotofilteringernalSite() {
  //   this.router.navigate(["/filtering"]);
  // }
  

}
