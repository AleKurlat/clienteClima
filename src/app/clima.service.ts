import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
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
    return this.http.post<any>
      (this.url, reqBody)
      .pipe(
        map((respuesta) => {
          const registros = respuesta.registros?.map((filaHistorial: any) => {
            return { ...filaHistorial, registro: JSON.parse(filaHistorial.registro) } // parseo a objeto el registro que viene de la base de datos, que está en formato string
          })
          const nuevaRespuesta = { ...respuesta, registros }
          return nuevaRespuesta
        }),
        catchError(this.handleError)
      );
  }
}
