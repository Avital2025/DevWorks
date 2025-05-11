import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { user } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private fb: FormBuilder,
              private authService: AuthService, 
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




  onSubmit() {
    if (this.addUserForm.valid) {
      const user: user = this.addUserForm.value.userGroup;
      const { FullName, email, passwordHash, role } = user;
  
      this.authService.register(FullName, email, passwordHash, role).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.user.id);
          sessionStorage.setItem('fullName', response.user.fullName);
          sessionStorage.setItem('email', response.user.email);
          sessionStorage.setItem('role', 'worker'); 
  
          window.location.reload();
          this.dialogRef.close(); 
        
        },
  
        error: (error) => {
          const status = error.status;
        
          if (status === 409) {
            Swal.fire({
              icon: 'warning',
              title: 'אופס!',
              text: 'המשתמש כבר קיים במערכת',
            });
          } else if (status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'שגיאה בנתונים',
              text: 'אנא בדוק את פרטי המשתמש שהזנת',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'שגיאה',
              text: 'משהו השתבש. נסה שוב מאוחר יותר',
            });
          }
        }
        
      });
    } Swal.fire({
      icon: 'warning',
      title: 'Please fill in all fields correctly.',
    });
  }
}
