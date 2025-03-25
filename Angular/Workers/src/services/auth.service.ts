// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    // אם יש טוקן ב-localStorage, מחבר את המשתמש
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.token = token;
      this.isLoggedInSubject.next(true);
    }
  }

  // פונקציה להתחברות
  login(email: string, password: string) {
    return this.userService.login(email, password).subscribe(response => {
      // שמירת ה-token ב-localStorage
      this.token = response.token;
      localStorage.setItem('auth_token', this.token || '');
      this.isLoggedInSubject.next(true);
    });
  }

  // פונקציה לרישום משתמש
  register(FullName: string, email: string, passwordHash: string, role: string) {
    return this.userService.register(FullName, email, passwordHash, role); // אין subscribe כאן
  }
  

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token'); 
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  getToken() {
    return this.token;
  }
}
