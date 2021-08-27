import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { TipoClima } from './tipos'

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url = environment.APIEndpoint + '/api/registro_clima';

  constructor(private http: HttpClient,) { }

  getClima(reqBody: object): Observable<TipoClima> {
    return this.http.post
      (this.url, reqBody)
  }

}
