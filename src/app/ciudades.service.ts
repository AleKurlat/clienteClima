import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { TipoCiudades, TipoCiudad, TipoClima } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private url = environment.APIEndpoint + '/api/ciudades';
  constructor(private http: HttpClient,) { }

  //chequear tipo
  getCiudades(): Observable<any> {
    return this.http.get
      (this.url)
  }

  agregarCiudad(reqBody: object) {
    return this.http.post
      (this.url, reqBody)
  }

  borrarCiudad(id: number) {
    return this.http.delete
      (this.url + "/" + id)
  }
}
