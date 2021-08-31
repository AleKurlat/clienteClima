import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { RespuestaApi } from './tipos'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url = environment.APIEndpoint + '/api/registro_clima';

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

  getClima(reqBody: {
    "ciudad": string,
    "cantFilasHistorial": number
  }): Observable<RespuestaApi> {
    return this.http.post<RespuestaApi>
      (this.url, reqBody)
      .pipe(
        catchError(this.handleError)
      );
  }
}
