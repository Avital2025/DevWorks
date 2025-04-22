import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';




@Component({
    standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet,RouterModule,FooterComponent,NavbarComponent],
      // ,FilteringComponent,JobListComponent
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Workers';
  jobs: any[] = [];
  
//   isLoggedIn = true; // או לפי מה שמתאים לך

// updateJobList(filteredJobs: any) {
//   this.jobs = filteredJobs;
// }
}
