// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class ExtractedFilesService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   getFilteredProjects(
//     Experience: number | null,
//     WorkPlace: string,
//     Languages: string,
//     RemoteWork: boolean | null,
//     EnglishLevel: string
//   ): Observable<any> {
//     const params = new HttpParams()
//       .set('Experience', Experience !== null ? Experience.toString() : '')
//       .set('WorkPlace', WorkPlace)
//       .set('Languages', Languages)
//       .set('RemoteWork', RemoteWork !== null ? RemoteWork.toString() : '')
//       .set('EnglishLevel', EnglishLevel);

//     return this.http.get<any>(`${this.apiUrl}/extractedData`, { params });
//   }

//   getDownloadUrl(s3Key: string): Observable<{ url: string }> {
//     return this.http.get<{ url: string }>(`${this.apiUrl}/files/generate-presigned-download-url`, {
//       params: { fileName: s3Key }
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FilterModel } from '../models/filter';


@Injectable({
  providedIn: 'root',
})
export class ExtractedFilesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFilteredProjects(filter: FilterModel): Observable<any> {
    let params = new HttpParams();

    if (filter.Experience !== null && filter.Experience !== undefined) {
      params = params.set('Experience', filter.Experience.toString());
    }
    if (filter.WorkPlace) {
      params = params.set('WorkPlace', filter.WorkPlace);
    }
    if (filter.Languages) {
      params = params.set('Languages', filter.Languages);
    }
    if (filter.RemoteWork !== null && filter.RemoteWork !== undefined) {
      params = params.set('RemoteWork', filter.RemoteWork.toString());
    }
    if (filter.EnglishLevel) {
      params = params.set('EnglishLevel', filter.EnglishLevel);
    }
console.log("filter", filter);

    return this.http.get<any>(`${this.apiUrl}/extractedData`, { params });
  }

  getDownloadUrl(s3Key: string): Observable<{ url: string }> {
    console.log("s3Key", s3Key);
    return this.http.get<{ url: string }>(`${this.apiUrl}/files/generate-presigned-download-url`, {
      params: { fileName: s3Key }
    });
  }
}
