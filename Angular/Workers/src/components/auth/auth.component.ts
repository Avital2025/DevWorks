import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoggedIn = false;
  profileForm!: FormGroup;
  hidePassword = true;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.profileForm = this.fb.group({
      fullName: [sessionStorage.getItem('fullName') || '', Validators.required],
      email: [{ value: sessionStorage.getItem('email') || '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('token');
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => this.checkLoginStatus());
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => this.checkLoginStatus());
  }


  onMenuOpened() {
    const fullName = sessionStorage.getItem('fullName') || '';
    const email = sessionStorage.getItem('email') || '';
  
    this.profileForm.patchValue({ fullName });
    this.profileForm.get('email')?.setValue(email);
  }

  
  
  onUpdate() {
    if (this.profileForm.valid) {
      const { fullName, password } = this.profileForm.getRawValue();
      sessionStorage.setItem('fullName', fullName);

      const userId = Number(sessionStorage.getItem('userId'));
      if (!userId) {
        console.error('לא נמצא userId ב-sessionStorage');
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'לא נמצא משתמש מחובר',
        });
        return;
      }

      this.userService.updateUserDetails(fullName, password).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'העדכון נשמר',
            text: 'הפרטים שלך נשמרו במערכת',
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'שגיאה',
            text: 'עדכון הפרטים נכשל',
          });
        }
      });

      this.menuTrigger.closeMenu();
      this.profileForm.get('password')?.reset();
    }
  }

  logout() {
    this.authService.logout();

    if (this.menuTrigger) {
      this.menuTrigger.closeMenu();
    }


    this.router.navigate(['/']).then(() => {
      this.checkLoginStatus(); 
    });
  }
}
