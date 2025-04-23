// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { UserService } from './user.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//   private token: string | null = null;

//   constructor(private userService: UserService, private http: HttpClient, private router: Router) {
//     // אם יש טוקן ב-localStorage, מחבר את המשתמש
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       this.token = token;
//       this.isLoggedInSubject.next(true);
//     }
//   }

//   // פונקציה להתחברות
//   login(email: string, password: string) {
//     return this.userService.login(email, password).subscribe(response => {
//       // שמירת ה-token ב-localStorage
//       this.token = response.token;
//       localStorage.setItem('auth_token', this.token || '');
//       this.isLoggedInSubject.next(true);
//     });
//   }

//   // פונקציה לרישום משתמש
//   register(FullName: string, email: string, passwordHash: string, role: string) {
//     return this.userService.register(FullName, email, passwordHash, role); // אין subscribe כאן
//   }
  

//   logout() {
//     this.token = null;
//     localStorage.removeItem('auth_token'); 
//     this.isLoggedInSubject.next(false);
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn() {
//     return this.isLoggedInSubject.asObservable();
//   }

//   getToken() {
//     return this.token;
//   }
// }
// auth.service.ts
// auth.service.ts// auth.service.ts


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
  // constructor(
  //   private userService: UserService,
  //   private http: HttpClient,
  //   private router: Router
  // ) {
  // //   // אם יש נתונים ב-sessionStorage, אנחנו לוקחים אותם
  // //   const authData = sessionStorage.getItem('auth_data');
  // //   if (authData) {
  // //     const parsed = JSON.parse(authData);
  // //     this.token = parsed.token;
  // //     this.isLoggedInSubject.next(true);
  
  // //   }
  // }
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {
    // ניגשים ל-sessionStorage רק אם אנחנו בבראוזר
    if (typeof window !== 'undefined') {
      const authData = sessionStorage.getItem('auth_data');
      if (authData) {
        const parsed = JSON.parse(authData);
        this.token = parsed.token;
        this.isLoggedInSubject.next(true);
      }
    }
  }
  

  // התחברות
  login(email: string, password: string) {
    return this.userService.login(email, password).subscribe(response => {
      if (response.token && response.user) {
        this.token = response.token;
  
        // כאן אנחנו שומרים את המידע ב-sessionStorage, כולל את ה-role מתוך מודל ה-user
        const authData = {
          token: response.token,
          user: {
            id: response.user.id,
            fullName: response.user.fullName,
            email: response.user.email,
            role: response.user.role // ה-role יילקח כאן מתוך המודל של ה-user
          }
        };
  
        // אם אנחנו בבראוזר, נשמור את זה ב-sessionStorage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('auth_data', JSON.stringify(authData));
        }
  
        this.isLoggedInSubject.next(true);
      } else {
        console.error('Login response missing token or user data');
      }
    });
  }
  

  // רישום
  register(fullName: string, email: string, passwordHash: string, role: string) {
    return this.userService.register(fullName, email, passwordHash, role);
  }

  // התנתקות
  logout() {
    console.log("logout");
  
    this.token = null;
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  // האם מחובר
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // קבלת טוקן
  getToken() {
    return this.token;
  }

  // שליפת פרטי משתמש
  getCurrentUser() {
    const authData = sessionStorage.getItem('auth_data');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.user;
    }
    return null;
  }

  // שליפת ID של המשתמש
  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  // שליפת תפקיד (role) של המשתמש
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}
