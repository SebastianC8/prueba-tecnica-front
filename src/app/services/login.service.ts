import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `${environment.urlApi}`;

  constructor(private http: HttpClient) { }

  public login = (params: FormData) => {
    return this.http.post(`${this.url}/api/login`, params);
  }

  public registro = (params: FormData) => {
    return this.http.post(`${this.url}/api/registro`, params);
  }

}
