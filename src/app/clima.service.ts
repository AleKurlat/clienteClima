import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TipoClima } from './tipoClima'

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url = 'http://localhost:3001/api/registro_clima';

  constructor(private http: HttpClient,) { }

  getClima(reqBody: object): Observable<TipoClima> {
    return this.http.post
      (this.url, reqBody)
  }

}
