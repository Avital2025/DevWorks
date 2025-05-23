import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(FullName: string, email: string, passwordHash: string, role: string): Observable<any> {
    const user = { FullName, email, passwordHash, role };
    return this.http.post(`${this.apiUrl}/Auth/register`, user);
  }

  login(email: string, passwordHash: string): Observable<any> {
    const credentials = { email, passwordHash };
    return this.http.post(`${this.apiUrl}/Auth/login`, credentials);
  }

  updateUserDetails(FullName: string, PasswordHash: string): Observable<any> {
    const body = { FullName, PasswordHash };
    return this.http.put(`${this.apiUrl}/users/update-credentials`, body);
  }

  validateToken(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validateToken`, { token });
  }
}
