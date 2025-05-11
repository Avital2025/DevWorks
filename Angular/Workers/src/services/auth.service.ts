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
    if (typeof window !== 'undefined') {
      const authData = sessionStorage.getItem('auth_data');
      if (authData) {
        const parsed = JSON.parse(authData);
        this.token = parsed.token;
        this.validateToken(parsed.token); 
      }
    }
  }



  public checkCurrentToken() {
    const token = sessionStorage.getItem('token');
  
    if (token) {
      return this.validateToken(token);  
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);  
        observer.complete();
      });
    }
  }
  
  private validateToken(token: string) {
  
    return this.userService.validateToken(token).pipe(
      map((response) => {
        if (response.valid) {
          return true;  
        } else {
          this.logout();  
          return false;
        }
      }),
      catchError(() => {
        this.logout();   
        return of(false); 
      })
    );
  }
  

 
  login(email: string, password: string) {
    return this.userService.login(email, password).subscribe(response => {
      if (response.token && response.user) {
        this.token = response.token;

        
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

        this.isLoggedInSubject.next(true);  
      } else {
        console.error('Login response missing token or user data');
      }
    });
  }


  register(fullName: string, email: string, passwordHash: string, role: string) {
    return this.userService.register(fullName, email, passwordHash, role);
  }

  logout() {

    this.token = null;
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);  
  }

  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }


  getCurrentUser() {
    const authData = sessionStorage.getItem('auth_data');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.user;
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}
