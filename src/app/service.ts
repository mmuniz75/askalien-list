import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

import { IAnswer } from './answer';
import { AnswerDetail } from './answer.detail';
import { IServer } from './server';
import { SERVER_CONF } from './consts';

@Injectable()
export class Service {

  private HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected http: HttpClient) { }

  public listAnswers(from: Number, to: Number): Observable<IAnswer[]> {

    let url = `http://${environment.SERVER_URL}/answers`;

    if (from && to)
      url = `${url}/${from}/${to}`;

    return this.http.get<IAnswer[]>(url, this.HTTP_OPTIONS)
      .pipe(
      catchError(this.handleError('AnswerService', 'getAnswers', []))
      );
  }

  public getAnswer(id: number): Observable<AnswerDetail> {
    const url = `http://${environment.SERVER_URL}/answer/${id}`;

    return this.http.get<AnswerDetail>(url, this.HTTP_OPTIONS)
      .pipe(
      catchError(this.handleError<AnswerDetail>(`getAnswer id=${id}`))
      );
  }

  public configServer():Observable<IServer>{
    return this.http.get<IServer>(SERVER_CONF)
          .pipe(
            tap(server => this.setServer(server)),
            catchError(this.handleError<IServer>('Service','configServer'))
          );
  }

  private setServer(server){
    environment.SERVER_URL = server.server;
  }

  handleError<T>(service: string, operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }




}



