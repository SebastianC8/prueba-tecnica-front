import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  url = `${environment.urlApi}`;

  userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  public getActividades = () => {
    return this.http.get(`${this.url}/api/getActividades/${this.userId}`);
  }

  public agregarActividad = (params: FormData) => {
    return this.http.post(`${this.url}/api/agregarActividad/${this.userId}`, params);
  }

}
