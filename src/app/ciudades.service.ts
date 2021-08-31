import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { TipoCiudades } from './tipos';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private url = environment.APIEndpoint + '/api/ciudades';
  private handleError(error: HttpErrorResponse) {
    const status = error?.status
    const mensajeError =
      status === 0 ?
        `No se ha podido establecer una conexión con el servidor` :
        `${error?.error?.message} (${status})`
    Swal.fire(mensajeError)
    return throwError(mensajeError)
  }

  constructor(private http: HttpClient,) { }

  traerCiudades(): Observable<TipoCiudades> {
    return this.http.get<TipoCiudades>
      (this.url).pipe(
        catchError(this.handleError)
      );
  }

  agregarCiudad(reqBody: { "ciudad": string }) {
    return this.http.post
      (this.url, reqBody).pipe(
        catchError(this.handleError)
      );
  }

  borrarCiudad(id: number) {
    return this.http.delete
      (this.url + "/" + id).pipe(
        catchError(this.handleError)
      );
  }
}
