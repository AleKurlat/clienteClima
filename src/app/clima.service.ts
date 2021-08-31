import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { RespuestaApi, RespuestaApiMapeada } from './tipos'
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
  }): Observable<RespuestaApiMapeada> {
    return this.http.post<RespuestaApi>
      (this.url, reqBody)
      .pipe(
        map((respuesta) => {
          if (respuesta.registros) {
            // si la respuesta viene con historial, tengo que transformar los registros porque vienen de la base de datos en formato string
            const registros = respuesta.registros.map((filaHistorial) => {
              return { ...filaHistorial, registro: JSON.parse(filaHistorial.registro) }
            })
            return { ...respuesta, registros }
          } else {
            // si no hay historial incluido en la respuesta, la devuelvo tal como vino (la aclaración registros:null es un requisito de TypeScript)
            return { ...respuesta, registros: null }
          }
        }),
        catchError(this.handleError)
      );
  }
}
