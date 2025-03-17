// import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { ExtractedFilesService } from '../../services/extracted-files-service.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-filtering',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     CommonModule,
//     MatOptionModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     HttpClientModule
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   templateUrl: './filtering.component.html',
//   styleUrls: ['./filtering.component.css']
// })
// export class FilteringComponent implements OnInit {

//   filterForm!: FormGroup;
//   languages: string[] = ['C#', 'Java', 'Cobol'];

//   @ViewChild('instructionsDialog') instructionsDialog!: TemplateRef<any>;
//   instructions: string = '';
//   inputValue: string = '';

//   dialogForm!: FormGroup; // הוספת טופס לדיאלוג

//   constructor(private fb: FormBuilder, 
//               private dataService: ExtractedFilesService,
//               public dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.filterForm = this.fb.group({
//       title: [''],
//       description: [''],
//       experience: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // חובה להיות מספר
//       workplace: [''],
//       languages: [[]], // מערך של שפות
//       remoteWork: [null],
//       englishLevel: ['']
//     });

//     // יצירת טופס לדיאלוג
//     this.dialogForm = this.fb.group({
//       dialogInput: ['']
//     });
//   }

//   // עדכון לשליחת הנתונים
//   async onSubmit() {
//     if (this.filterForm.valid) {
//       const formValues = this.filterForm.value;
//       this.dataService.getFilteredProjects(
//         formValues.title,
//         formValues.description,
//         formValues.experience,
//         formValues.workplace,
//         formValues.languages,
//         formValues.remoteWork,
//         formValues.englishLevel
//       ).subscribe(response => {
//         console.log(response);
//       });
//     }
//   }

//   // פתיחת דיאלוג הוראות
//   openInstructions(field: string): void {
//     switch (field) {
//       case 'experience':
//         this.instructions = 'Please enter a number representing years of experience.';
//         break;
//       case 'languages':
//         this.instructions = 'Select one or more programming languages from the list.';
//         break;
//       case 'englishLevel':
//         this.instructions = 'Choose a level: Low, Medium, or High.';
//         break;
//       default:
//         this.instructions = 'Fill in this field as required.';
//     }

//     // פותחים את הדיאלוג
//     this.dialog.open(this.instructionsDialog);
//   }
// }




// import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { ExtractedFilesService } from '../../services/extracted-files-service.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-filtering',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     CommonModule,
//     MatOptionModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     HttpClientModule
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   templateUrl: './filtering.component.html',
//   styleUrls: ['./filtering.component.css']
// })
// export class FilteringComponent implements OnInit {
//   filterForm!: FormGroup;
//   languages: string[] = ['C#', 'Java', 'Cobol'];

//   @ViewChild('instructionsDialog') instructionsDialog!: TemplateRef<any>;
//   instructions: string = '';
//   dialogForm!: FormGroup;
//   dialogType: string = ''; // לאיזה סוג שדה אנו מציגים את הדיאלוג
//   selectedValues: { [key: string]: any } = {}; // שדה לאחסון הערכים שנבחרו

//   constructor(private fb: FormBuilder, 
//               private dataService: ExtractedFilesService,
//               public dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.filterForm = this.fb.group({
//       title: [''],
//       description: [''],
//       experience: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
//       workplace: [''],
//       languages: [[]],
//       remoteWork: [null],
//       englishLevel: ['']
//     });

//     // יצירת טופס לדיאלוג
//     this.dialogForm = this.fb.group({
//       dialogInput: ['']
//     });
//   }

//   async onSubmit() {
//     if (this.filterForm.valid) {
//       const formValues = this.filterForm.value;
//       this.dataService.getFilteredProjects(
//         formValues.title,
//         formValues.description,
//         formValues.experience,
//         formValues.workplace,
//         formValues.languages,
//         formValues.remoteWork,
//         formValues.englishLevel
//       ).subscribe(response => {
//         console.log(response);
//       });
//     }
//   }

//   openInstructions(field: string): void {
//     this.dialogType = field;
//     switch (field) {
//       case 'experience':
//         this.instructions = 'Please enter a number representing years of experience.';
//         break;
//       case 'languages':
//         this.instructions = 'Select one or more programming languages from the list.';
//         break;
//       case 'englishLevel':
//         this.instructions = 'Choose a level: Low, Medium, or High.';
//         break;
//       default:
//         this.instructions = 'Fill in this field as required.';
//     }
//     this.dialog.open(this.instructionsDialog);
//   }

//   closeDialog(): void {
//     this.dialogForm.reset(); // איפוס השדה
//     this.dialog.closeAll();  // סגירת כל הדיאלוגים
//   }

//   saveSelection(): void {
//     const value = this.dialogForm.get('dialogInput')?.value;
//     if (value) {
//       this.selectedValues[this.dialogType] = value; // שמירת הבחירה
//       this.filterForm.patchValue({ [this.dialogType]: value }); // עדכון הערך בטופס
//     }
//     this.closeDialog();
//   }
// }
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ExtractedFilesService } from '../../services/extracted-files-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    NavbarComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {
  filterForm!: FormGroup;
  languages: string[] = ['C#', 'Java', 'Cobol'];

  @ViewChild('instructionsDialog') instructionsDialog!: TemplateRef<any>;
  instructions: string = '';
  dialogForm!: FormGroup;
  dialogType: string = ''; // לאיזה סוג שדה אנו מציגים את הדיאלוג
  selectedValues: { [key: string]: any } = {}; // שדה לאחסון הערכים שנבחרו

  constructor(private fb: FormBuilder, 
              private dataService: ExtractedFilesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      title: [''],
      description: [''],
      experience: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      workplace: [''],
      languages: [[]],
      remoteWork: [null],
      englishLevel: ['']
    });

    // יצירת טופס לדיאלוג
    this.dialogForm = this.fb.group({
      dialogInput: ['']
    });
  }

  async onSubmit() {
    if (this.filterForm.valid) {
      const formValues = this.filterForm.value;
      this.dataService.getFilteredProjects(
        formValues.title,
        formValues.description,
        formValues.experience,
        formValues.workplace,
        formValues.languages,
        formValues.remoteWork,
        formValues.englishLevel
      ).subscribe(response => {
        console.log(response);
      });
    }
  }

  openInstructions(field: string): void {
    this.dialogType = field;
    switch (field) {
      case 'experience':
        this.instructions = 'Please enter a number representing years of experience.';
        break;
      case 'languages':
        this.instructions = 'Select one or more programming languages from the list.';
        break;
      case 'englishLevel':
        this.instructions = 'Choose a level: Low, Medium, or High.';
        break;
      default:
        this.instructions = 'Fill in this field as required.';
    }
    this.dialog.open(this.instructionsDialog);
  }

  closeDialog(): void {
    this.dialogForm.reset(); // איפוס השדה
    this.dialog.closeAll();  // סגירת כל הדיאלוגים
  }

  saveSelection(): void {
    const value = this.dialogForm.get('dialogInput')?.value;
    if (value) {
      this.selectedValues[this.dialogType] = value; // שמירת הבחירה
      this.filterForm.patchValue({ [this.dialogType]: value }); // עדכון הערך בטופס
    }
    this.closeDialog();
  }
}

