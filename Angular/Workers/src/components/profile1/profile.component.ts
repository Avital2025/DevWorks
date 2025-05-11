import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProfileComponent>,
    private fb: FormBuilder,
    private browserStorage: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: [this.browserStorage.getItem('fullName') || '', Validators.required],
      email: [this.browserStorage.getItem('email') || '', [Validators.required, Validators.email]]
    });
  }

  onUpdate() {
    if (this.profileForm.valid) {
      const { fullName, email } = this.profileForm.value;
      this.browserStorage.setItem('fullName', fullName);
      this.browserStorage.setItem('email', email);
      this.dialogRef.close();
    }
  }

  logout() {
    this.browserStorage.clear();
    this.dialogRef.close();
    location.reload();
  }
}
