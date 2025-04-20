import { Component, Input } from '@angular/core';
import { FilteringComponent } from '../filtering/filtering.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-job-list',
  imports: [FilteringComponent, NavbarComponent],
  standalone: true,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent {
  @Input() jobs: any[] = [];
  @Input() isLoggedIn = false;

  downloadJob(url: string) {
    window.open(url, '_blank');
  }

  saveJob(jobId: number) {
    // כאן תוסיפי את הלוגיקה לשמירה ל-DB
    console.log('שמירה של משרה עם ID:', jobId);
  }
}
