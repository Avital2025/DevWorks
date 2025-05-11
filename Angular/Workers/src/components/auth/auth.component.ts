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
import { BrowserStorageService } from '../../services/browser-storage.service';

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
    private browserStorage: BrowserStorageService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.profileForm = this.fb.group({
      fullName: [this.browserStorage.getItem('fullName') || '', Validators.required],
      email: [{ value: this.browserStorage.getItem('email') || '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  checkLoginStatus() {
    this.isLoggedIn = !!this.browserStorage.getItem('token');
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
    const fullName = this.browserStorage.getItem('fullName') || '';
    const email = this.browserStorage.getItem('email') || '';

    this.profileForm.patchValue({ fullName });
    this.profileForm.get('email')?.setValue(email);
  }

  onUpdate() {
    if (this.profileForm.valid) {
      const { fullName, password } = this.profileForm.getRawValue();
      this.browserStorage.setItem('fullName', fullName);

      const userId = Number(this.browserStorage.getItem('userId'));
      if (!userId) {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'לא נמצא משתמש מחובר',
        });
        return;
      }

      this.userService.updateUserDetails(fullName, password).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'העדכון נשמר',
            text: 'הפרטים שלך נשמרו במערכת',
          });
        },
        error: () => {
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
