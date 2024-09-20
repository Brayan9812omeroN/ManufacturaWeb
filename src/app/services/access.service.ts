import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Usuario } from '../interfaces/Usuario';
import { ResponseAccess } from '../interfaces/ResponseAccess';
import { Login } from '../interfaces/Login';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  login(user: Login): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.baseUrl}/auth/log-in`, user)
  }

}
