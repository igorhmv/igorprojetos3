import { query } from '@angular/animations';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Relatorio } from '../models/relatorio';


const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  url = environment.url + 'api/relatorioauditoria/relatorio';

  
  

  constructor(private httpClient: HttpClient) { }

  public getRelatorio2(parametros:string[] ) {

    return this.httpClient.get<Relatorio[]>(`${this.url}?dt_auditoriaInicial=${parametros[0]}&dt_auditoriaFinal=${parametros[1]}`
    ,{
      
      headers:headers}
    ).pipe(
      retry(2),
      catchError(this.handleError));
  }
  

  public getRelatorio(relatorioJson:string ) {

    return this.httpClient.get<Relatorio[]>(`${this.url,
      {
        mode: 'cors',
        headers: headers
    }
    }
    ?${relatorioJson}`
    ).pipe(
      retry(2),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  };
  
  
}
