import { Component, signal, computed } from '@angular/core';
import { FilteringComponent } from '../filtering/filtering.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [FilteringComponent, CommonModule,],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  jobs = signal<any[]>([]);
  isLoggedIn = true;
  loading = true;

  pageSize = 5;
  currentPage = signal(1);
  showFilters = signal(false);

  toggleFilters() {
    this.showFilters.update(value => !value);
  }
  totalPages = computed(() => Math.ceil(this.jobs().length / this.pageSize));

  pagedJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.jobs().slice(start, start + this.pageSize);
  });

  updateJobList(filteredJobs: any[]) {
    this.jobs.set(filteredJobs);
    this.loading = false;
    this.currentPage.set(1); // חזרה לעמוד הראשון
  }

  downloadJob(url: string) {
    window.open(url, '_blank');
  }

  saveJob(jobId: number) {
    console.log('שמירה של משרה עם ID:', jobId);
  }
  scrollToFilter() {
    const element = document.getElementById('filter-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
