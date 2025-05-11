import { Component, signal, computed } from '@angular/core';
import { FilteringComponent } from '../filtering/filtering.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ExtractedFilesService } from '../../services/extracted-files-service.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [FilteringComponent, CommonModule,MatIconModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  jobs = signal<any[]>([]);
  isLoggedIn = false; 
  loading = true;

  pageSize = 5;
  currentPage = signal(1);
  showFilters = signal(false);
  constructor(private authService: AuthService,
    private extractedFilesService: ExtractedFilesService,
  ) {}



  ngOnInit(): void {
  
    this.authService.checkCurrentToken().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;  
    });
  }
  

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
    this.currentPage.set(1); 
  }

  downloadJob(s3Key: string) {
  
    this.extractedFilesService.getDownloadUrl(s3Key).subscribe({
      next: (res: { url: string }) => {
        const link = document.createElement('a');
        link.href = res.url;
        link.download = s3Key;
        link.target = '_blank'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (err) => {
        console.error('Error fetching the presigned URL:', err);
      }
    });
  }
  
  
  

  saveJob(jobId: number) {
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
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
