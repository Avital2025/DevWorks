import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtractedFilesService {
  private apiUrl = 'http://localhost:5069'; 

  constructor(private http: HttpClient) {}

  // פונקציה לשליפת המידע המחולץ
  getFilteredProjects(
    Experience: number | null, 
    WorkPlace: string, 
    Languages: string, 
    RemoteWork: boolean | null, 
    EnglishLevel: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('Experience', Experience !== null ? Experience.toString() : '')
      .set('WorkPlace', WorkPlace)
      .set('Languages', Languages)
      .set('RemoteWork', RemoteWork !== null ? RemoteWork.toString() : '')
      .set('EnglishLevel', EnglishLevel);
      console.log('שולח בקשה לשרת עם הפרמטרים הבאים:', params.toString());
    return this.http.get<any>(`${this.apiUrl}/extractedData`, { params });
  }

  
}
