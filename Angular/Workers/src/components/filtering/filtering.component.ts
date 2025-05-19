import { Component, ViewChild, TemplateRef, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtractedFilesService } from '../../services/extracted-files-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'; 
import { FilterModel } from '../../models/filter';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule, 
  ],
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
})
export class FilteringComponent implements OnInit {
  @Output() filteredJobs = new EventEmitter<any>();


  filterForm!: FormGroup;

  languages: string[] = ['JavaScript', 'Python','TypeScript','React',  'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go' , 'C' ,'.Net'];
    workplaceOptions: string[] = [
    'תל אביב והמרכז', 'ירושלים', 'חיפה והצפון', 'באר שבע והדרום', 'אילת', 'השרון', 'השפלה', 'אחר'
  ];



  @ViewChild('instructionsDialog') instructionsDialog!: TemplateRef<any>;
  instructions: string = '';
  dialogForm!: FormGroup;
  dialogType: string = '';
  selectedValues: { [key: string]: any } = {};

  private fb = inject(FormBuilder);
  private dataService = inject(ExtractedFilesService);

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      experience: [null],
      workplace: [''],
      languages: [[]],
      remoteWork: [null],
      englishLevel: [''],
    });

    this.dialogForm = this.fb.group({
      dialogInput: [''],
    });
    if (typeof window !== 'undefined') {
      this.onSubmit();
    }
    
  }

  async onSubmit() {
    if (this.filterForm.valid) {
      const formValues = this.filterForm.value;
  
      const filter: FilterModel = {
        Experience: formValues.experience,
        WorkPlace: formValues.workplace,
        Languages: formValues.languages.join(','), 
        RemoteWork: formValues.remoteWork,
        EnglishLevel: formValues.englishLevel
      };
  
      this.dataService.getFilteredProjects(filter).subscribe((response) => {
        this.filteredJobs.emit(response);
      });
    }
  }

  openInstructions(type: string) {
    this.dialogType = type;
    this.instructions = this.getInstructionsText(type);
  }

  getInstructionsText(type: string): string {
    switch (type) {
      case 'experience':
        return 'Enter the number of years of experience.';
      case 'languages':
        return 'Select one or more programming languages.';
      case 'englishLevel':
        return 'Select your English proficiency level: Low, Medium, or High.';
      case 'remoteWork':
        return 'Indicate whether you prefer remote job opportunities.';
      case 'workplace':
        return 'Select the workplace location.';
      default:
        return 'Fill in this filter to narrow down relevant jobs.';
    }
  }
  

  closeDialog(): void {
    this.dialogForm.reset();
  }
  clearSelections(): void {
    this.selectedValues = {};
    this.filterForm.reset({
      experience: null,
      workplace: '',
      languages: [],     
      remoteWork: null,
      englishLevel: ''
    });
  }
  
  saveSelection(field: string): void {
    const value = this.dialogForm.get('dialogInput')?.value;
    if (value != null) {
      this.selectedValues[field] = value;
      this.filterForm.patchValue({ [field]: value });
    }
    
  }
}