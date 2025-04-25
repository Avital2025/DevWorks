// // // auth.service.ts
// // import { Injectable } from '@angular/core';
// // import { BehaviorSubject } from 'rxjs';
// // import { UserService } from './user.service';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
// //   private token: string | null = null;

// //   constructor(private userService: UserService, private http: HttpClient, private router: Router) {
// //     // אם יש טוקן ב-localStorage, מחבר את המשתמש
// //     const token = localStorage.getItem('auth_token');
// //     if (token) {
// //       this.token = token;
// //       this.isLoggedInSubject.next(true);
// //     }
// //   }

// //   // פונקציה להתחברות
// //   login(email: string, password: string) {
// //     return this.userService.login(email, password).subscribe(response => {
// //       // שמירת ה-token ב-localStorage
// //       this.token = response.token;
// //       localStorage.setItem('auth_token', this.token || '');
// //       this.isLoggedInSubject.next(true);
// //     });
// //   }

// //   // פונקציה לרישום משתמש
// //   register(FullName: string, email: string, passwordHash: string, role: string) {
// //     return this.userService.register(FullName, email, passwordHash, role); // אין subscribe כאן
// //   }
  

// //   logout() {
// //     this.token = null;
// //     localStorage.removeItem('auth_token'); 
// //     this.isLoggedInSubject.next(false);
// //     this.router.navigate(['/login']);
// //   }

// //   isLoggedIn() {
// //     return this.isLoggedInSubject.asObservable();
// //   }

// //   getToken() {
// //     return this.token;
// //   }
// // }
// // auth.service.ts
// // auth.service.ts// auth.service.ts


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
  
  
//   // constructor(
//   //   private userService: UserService,
//   //   private http: HttpClient,
//   //   private router: Router
//   // ) {
//   // //   // אם יש נתונים ב-sessionStorage, אנחנו לוקחים אותם
//   // //   const authData = sessionStorage.getItem('auth_data');
//   // //   if (authData) {
//   // //     const parsed = JSON.parse(authData);
//   // //     this.token = parsed.token;
//   // //     this.isLoggedInSubject.next(true);
  
//   // //   }
//   // }
//   constructor(
//     private userService: UserService,
//     private http: HttpClient,
//     private router: Router
//   ) {
//     // ניגשים ל-sessionStorage רק אם אנחנו בבראוזר
//     if (typeof window !== 'undefined') {
//       const authData = sessionStorage.getItem('auth_data');
//       if (authData) {
//         const parsed = JSON.parse(authData);
//         this.token = parsed.token;
//         this.validateToken(parsed.token);
//       }
//     }
//   }
  
  
  
//     // ניגשים ל-sessionStorage רק אם אנחנו בבראוזר

//   // התחברות
//   login(email: string, password: string) {
//     return this.userService.login(email, password).subscribe(response => {
//       if (response.token && response.user) {
//         this.token = response.token;
  
//         // כאן אנחנו שומרים את המידע ב-sessionStorage, כולל את ה-role מתוך מודל ה-user
//         const authData = {
//           token: response.token,
//           user: {
//             id: response.user.id,
//             fullName: response.user.fullName,
//             email: response.user.email,
//             role: response.user.role // ה-role יילקח כאן מתוך המודל של ה-user
//           }
//         };
  
//         // אם אנחנו בבראוזר, נשמור את זה ב-sessionStorage
//         if (typeof window !== 'undefined') {
//           sessionStorage.setItem('auth_data', JSON.stringify(authData));
//         }
  
//         this.isLoggedInSubject.next(true);
//       } else {
//         console.error('Login response missing token or user data');
//       }
//     });
//   }
  

//   // רישום
//   register(fullName: string, email: string, passwordHash: string, role: string) {
//     return this.userService.register(fullName, email, passwordHash, role);
//   }

//   // התנתקות
//   logout() {
//     console.log("logout");
  
//     this.token = null;
//     sessionStorage.clear();
//     this.isLoggedInSubject.next(false);
//   }

//   // האם מחובר
//   isLoggedIn() {
//     return this.isLoggedInSubject.asObservable();
//   }

//   // קבלת טוקן
//   getToken() {
//     return this.token;
//   }

//   // שליפת פרטי משתמש
//   getCurrentUser() {
//     const authData = sessionStorage.getItem('auth_data');
//     if (authData) {
//       const parsed = JSON.parse(authData);
//       return parsed.user;
//     }
//     return null;
//   }

//   // שליפת ID של המשתמש
//   getUserId(): number | null {
//     const user = this.getCurrentUser();
//     return user?.id || null;
//   }

//   // שליפת תפקיד (role) של המשתמש
//   getUserRole(): string | null {
//     const user = this.getCurrentUser();
//     return user?.role || null;
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

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
        this.validateToken(parsed.token);  // קריאה לשרת על מנת לבדוק את תקפות הטוקן
      }
    }
  }

  // AuthService - הוספת פונקציה ציבורית לבדיקת תוקף הטוקן
  // public checkCurrentToken() {
  //   const token = sessionStorage.getItem('token');
  //   console.log("checkCurrentToken", token);
    
  //   if (token) {
  //     this.validateToken(token);
  //   } else {
  //     this.isLoggedInSubject.next(false);
  //   }
  // }

  // // קריאה לשרת לבדוק אם הטוקן תקף
  // private validateToken(token: string) {
  //   console.log("Validating token:", token) 
  //   this.userService.validateToken(token).subscribe(
  //     (response) => {
  //       if (response.valid) {
  //         this.isLoggedInSubject.next(true);  // אם הטוקן תקף, נעדכן את הסטטוס
  //       } else {
  //         this.logout();  // אם לא, נבצע התנתקות
  //       }
  //     },
  //     (error) => {
  //       this.logout();  // אם קרתה שגיאה, נבצע התנתקות
  //     }
  //   );
  // }

  public checkCurrentToken() {
    const token = sessionStorage.getItem('token');
    console.log("checkCurrentToken", token);
  
    if (token) {
      return this.validateToken(token);  // מחזיר Observable שיחזיר את הערך של isLoggedIn
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);  // אם אין טוקן, מחזירים false מיד
        observer.complete();
      });
    }
  }
  
  // קריאה לשרת לבדוק אם הטוקן תקף
  private validateToken(token: string) {
    console.log("Validating token:", token);
  
    return this.userService.validateToken(token).pipe(
      map((response) => {
        if (response.valid) {
          return true;  // אם הטוקן תקף, נחזיר true
        } else {
          this.logout();  // אם לא, נבצע התנתקות
          return false;
        }
      }),
      catchError(() => {
        this.logout();  // אם קרתה שגיאה, נבצע התנתקות
        return of(false);  // אם קרתה שגיאה, נחזיר false
      })
    );
  }
  

  // התחברות
  login(email: string, password: string) {
    return this.userService.login(email, password).subscribe(response => {
      if (response.token && response.user) {
        this.token = response.token;

        // שמירת המידע ב-sessionStorage
        const authData = {
          token: response.token,
          user: {
            id: response.user.id,
            fullName: response.user.fullName,
            email: response.user.email,
            role: response.user.role
          }
        };

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('auth_data', JSON.stringify(authData));
        }

        this.isLoggedInSubject.next(true);  // נעדכן את הסטטוס לאחר התחברות
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
    this.isLoggedInSubject.next(false);  // נעדכן את הסטטוס אחרי התנתקות
  }

  // האם מחובר
  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // קבלת טוקן
  // getToken() {
  //   return this.token;
  // }

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
