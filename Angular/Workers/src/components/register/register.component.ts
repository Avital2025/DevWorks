import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Roles } from '../../models/eroles';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { user } from '../../models/user';
import { Router } from '@angular/router';
import { ErrorsComponent } from '../errors/errors.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    ErrorsComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {

  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private fb: FormBuilder,
              private authService: AuthService,  // השתמש ב-AuthService
              private router: Router) {}

  addUserForm!: FormGroup;

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwordHash: ['', Validators.required],
        FullName: ['', Validators.required],
      })
    });
  }

  // onSubmit() {
  //   if (this.addUserForm.valid) {
  //     const user : user = this.addUserForm.value.userGroup;
  //     const { FullName, email, passwordHash, role } = user;
    
  //     // קריאה לפונקציה register מה-AuthService
  //     this.authService.register(FullName, email, passwordHash, role).subscribe({
  //       next: (response) => {
  //         // במקרה של הצלחה
  //         sessionStorage.setItem('role', role);
  //         console.log('User registered successfully',response);
  //         sessionStorage.setItem('token', response.token);
  //         sessionStorage.setItem('userId', response.userId);
  //         this.dialogRef.close(); // סוגר את הדיאלוג
  //         this.router.navigate(['/profile']); // מעביר את המשתמש לעמוד האזור האישי
  //       },

        
  //       error: (err) => {
  //         // במקרה של שגיאה
  //         if (err.status === 400) {
  //           this.errormessage = 'Invalid data, please check your input and try again.';
  //         } else if (err.status === 404) {
  //           alert('User not found.');
  //         } else if (err.status === 500) {
  //           this.errormessage = 'There was an error with the server. Please try again later.';
  //         } else {
  //           this.errormessage = 'An unexpected error occurred. Please try again.';
  //         }
  //         this.showError = true;
  //         console.error('Error registering user', err);
  //       }
  //     });
  //   } else {
  //     this.showError = true;
  //     this.errormessage = 'Please fill in all fields correctly.';
  //   }
  // }


  onSubmit() {
    if (this.addUserForm.valid) {
      const user: user = this.addUserForm.value.userGroup;
      const { FullName, email, passwordHash, role } = user;
  
      // קריאה לפונקציית register מה-AuthService
      this.authService.register(FullName, email, passwordHash, role).subscribe({
        next: (response) => {
          // שמירת הנתונים מהתגובה שהתקבלה מהשרת
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.user.id);
          sessionStorage.setItem('fullName', response.user.fullName);
          sessionStorage.setItem('email', response.user.email);
          sessionStorage.setItem('role', 'worker'); // שמירת role אם קיים בטופס
  
          console.log('User registered successfully', response);
          window.location.reload();
          this.dialogRef.close(); // סוגר את הדיאלוג
        
        },
  
        error: (err) => {
          if (err.status === 400) {
            this.errormessage = 'Invalid data, please check your input and try again.';
          } else if (err.status === 404) {
            alert('User not found.');
          } else if (err.status === 500) {
            this.errormessage = 'There was an error with the server. Please try again later.';
          } else {
            this.errormessage = 'An unexpected error occurred. Please try again.';
          }
          this.showError = true;
          console.error('Error registering user', err);
        }
      });
    } else {
      this.showError = true;
      this.errormessage = 'Please fill in all fields correctly.';
    }
  }
  
  onErrorClosed() {
    this.showError = false; // הסתרת השגיאה לאחר סגירתה
  }
}
