import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatError } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addUserForm!: FormGroup;
  errormessage: string = '';
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private browserStorage: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        passwordHash: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const { email, passwordHash } = this.addUserForm.value.userGroup;

      this.userservice.login(email, passwordHash).subscribe({
        next: (response) => {
          this.browserStorage.setItem('token', response.token);
          this.browserStorage.setItem('role', 'Worker');
          this.browserStorage.setItem('userId', response.user.id);
          this.browserStorage.setItem('fullName', response.user.fullName);
          this.browserStorage.setItem('email', response.user.email);

          if (typeof window !== 'undefined') {
            window.location.reload();
          }

          this.dialogRef.close();
        },
        error: (err) => {
          if (err.status === 400) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops!',
              text: 'Invalid credentials',
            });
          } else if (err.status === 404) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops!',
              text: 'User not found. Please Sign up',
            });
          } else if (err.status === 409) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops!',
              text: 'This email is already exixts',
            });
          }
        }
      });

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all fields correctly.',
      });
    }
  }

  onErrorClosed() {
    this.showError = false;
  }
}
