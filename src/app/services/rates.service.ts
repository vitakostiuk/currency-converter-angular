import { ErrorService } from './error.service';
import { ICurrency } from './../models/currency';
import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RatesService {
  constructor(
    private http: HttpClient,
    // private errorService: ErrorService
    ) {
  }

  getCurrency(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
  }

  // private errorHandler(error: HttpErrorResponse) {
  //   this.errorService.handle(error.message)
  //   return throwError(() => error.message);
  // }
}

//.pipe(catchError(this.errorHandler.bind(this)))