import { Component, ViewChild, TemplateRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtractedFilesService } from '../../services/extracted-files-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'; // ודא שייבאת את MatIconModule
import { JobListComponent } from '../job-list/job-list.component';
@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule, // ייתכן שאתה לא צריך את MatDialogModule אם אתה לא משתמש ב-MatDialog בצורה אחרת
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    NavbarComponent,
    MatIconModule, // ודא שייבאת את MatIconModule
    JobListComponent,
  ],
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
})
export class FilteringComponent implements OnInit {
  filterForm!: FormGroup;
  languages: string[] = ['C#', 'Java', 'Cobol'];
  filteredJobs: any[] = []; // המערך שבו נשמור את המשרות המסוננות
  isLoggedIn = false;

  @ViewChild('instructionsDialog') instructionsDialog!: TemplateRef<any>;
  instructions: string = '';
  dialogForm!: FormGroup;
  dialogType: string = '';
  selectedValues: { [key: string]: any } = {};

  private fb = inject(FormBuilder);
  private dataService = inject(ExtractedFilesService);
  // public dialog = inject(MatDialog); // הסר את inject של MatDialog אם אתה לא משתמש בו בצורה אחרת

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
  }

  async onSubmit() {
    console.log("im here");

    if (this.filterForm.valid) {
      console.log("form is valid");

      const formValues = this.filterForm.value;
      this.dataService
        .getFilteredProjects(
          formValues.experience,
          formValues.workplace,
          formValues.languages.join(','),
          formValues.remoteWork,
          formValues.englishLevel
        )
        .subscribe((response) => {
          console.log(response);
          this.filteredJobs = response; 
          // here you can add the response handling logic
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
        return 'Please enter a number representing years of experience.';
      case 'languages':
        return 'Select one or more programming languages from the list.';
      case 'englishLevel':
        return 'Choose a level: Low, Medium, or High.';
      case 'remoteWork':
        return 'Choose if the job is remote.';
      case 'workplace':
        return 'Enter the workplace name or description.';
      default:
        return 'Fill in this field as required.';
    }
  }

  closeDialog(): void {
    this.dialogForm.reset();
    // this.dialog.closeAll(); // הסר שורה זו
  }

  saveSelection(field: string): void {
    const value = this.dialogForm.get('dialogInput')?.value;
    if (value) {
      this.selectedValues[field] = value;
      this.filterForm.patchValue({ [field]: value });
    }
    // this.closeDialog(); // הסר שורה זו
  }
}