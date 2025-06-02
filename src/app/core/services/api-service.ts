import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() {}

  get<T>(path: string, params?: any) {
    return this._http.get<T>(`${this.baseUrl}/${path}`, {
      params:
        params instanceof HttpParams
          ? params
          : new HttpParams({ fromObject: params }),
    });
  }

  post<T>(path: string, body: any) {
    return this._http.post<T>(`${this.baseUrl}/${path}`, body);
  }

  put<T>(path: string, body: any) {
    return this._http.put<T>(`${this.baseUrl}/${path}`, body);
  }

  delete<T>(path: string) {
    return this._http.delete<T>(`${this.baseUrl}/${path}`);
  }
}
