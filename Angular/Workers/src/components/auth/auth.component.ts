// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';


// @Component({
//     selector: 'app-auth',
//     imports: [
//         MatButtonModule, // כפתורים
//         MatFormFieldModule, // מסגרת לאינפוטים
//         MatInputModule, // אינפוטים מעוצבים
//         MatIconModule, // אייקונים
//         MatDialogModule,
//     ],
//     templateUrl: './auth.component.html',
//     styleUrl: './auth.component.css'
// })
// export class AuthComponent {
//   constructor(private dialog: MatDialog) {}

//   openLoginDialog() {
//     this.dialog.open(LoginComponent, {
//       width: '400px', // ניתן להגדיר גודל
//     });
//   }
//   openRegisterDialog() {
//     this.dialog.open(RegisterComponent, {
//       width: '400px', // ניתן להגדיר גודל
//     });
//   }
// }

// auth.component.tsimport { Component, OnInit } from '@angular/core';

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
   // console.log(this.profileForm);
    
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

  onUpdate() {
    if (this.profileForm.valid) {
      const { fullName, password } = this.profileForm.getRawValue();
      sessionStorage.setItem('fullName', fullName);
  
      const userId = Number(sessionStorage.getItem('userId'));
      if (!userId) {
        console.error('לא נמצא userId ב-sessionStorage');
        return;
      }
  
      this.userService.updateUserDetails( fullName, password).subscribe({
        next: (response) => console.log('פרטי המשתמש עודכנו בהצלחה', response),
        error: (err) => console.error('שגיאה בעדכון פרטי המשתמש:', err)
      });
  
      this.profileForm.get('password')?.reset();
    }
  }
  

  logout() {
    this.authService.logout();

    // סגור תפריט אם פתוח
    if (this.menuTrigger) {
      this.menuTrigger.closeMenu();
    }

    // נווט לדף הבית
    this.router.navigate(['/']).then(() => {
      this.checkLoginStatus(); // <-- עדכון ה־isLoggedIn
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-auth',
//   standalone: true,
//   imports: [
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatDialogModule,
//     RouterModule,
//   ],
//   templateUrl: './auth.component.html',
//   styleUrl: './auth.component.css'
// })
// export class AuthComponent implements OnInit {
//   isLoggedIn: boolean = false;

//   constructor(private dialog: MatDialog) {}

//   ngOnInit() {
//     this.checkLoginStatus();
//   }

//   checkLoginStatus() {
//     this.isLoggedIn = !!sessionStorage.getItem('token');
//   }

//   openLoginDialog() {
//     const dialogRef = this.dialog.open(LoginComponent, {
//       width: '400px',
//     });

//     dialogRef.afterClosed().subscribe(() => {
//       this.checkLoginStatus();
//     });
//   }

//   openRegisterDialog() {
//     const dialogRef = this.dialog.open(RegisterComponent, {
//       width: '400px',
//     });

//     dialogRef.afterClosed().subscribe(() => {
//       this.checkLoginStatus();
//     });
//   }
// }
