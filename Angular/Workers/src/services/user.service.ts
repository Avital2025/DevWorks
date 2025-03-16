import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5069'; // כאן תשים את ה-URL של ה-API שלך

  constructor(private http: HttpClient) { }


  register(FullName: string, email: string, passwordHash: string, role: string): Observable<any> {
    const user = { FullName, email, passwordHash, role };
    return this.http.post(`${this.apiUrl}/Auth/register` , user);
  }

  login(email: string, passwordHash: string): Observable<any> {
    const credentials = { email, passwordHash };
    return this.http.post(`${this.apiUrl}/Auth/login` , credentials);
  }
}

