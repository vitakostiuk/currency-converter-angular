import { ICurrency } from './../models/currency';
import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RatesService {
  constructor(
    private http: HttpClient,
    ) {
  }

  getCurrency(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
  }
}