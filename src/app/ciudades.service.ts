import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { TipoCiudades } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private url = environment.APIEndpoint + '/api/ciudades';

  constructor(private http: HttpClient,) { }

  traerCiudades(): Observable<TipoCiudades> {
    return this.http.get<TipoCiudades>
      (this.url)
  }

  agregarCiudad(reqBody: { "ciudad": string }) {
    return this.http.post
      (this.url, reqBody)
  }

  borrarCiudad(id: number) {
    return this.http.delete
      (this.url + "/" + id)
  }
}
