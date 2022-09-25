import { ICurrency } from './models/currency';
import { IRates } from './models/rates';
import { Component, OnInit } from '@angular/core';
import { RatesService } from './services/rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Конвертер валют';
  rates: IRates = {
    UAH: 1,
    USD: 0,
    EUR: 0
  };
  currencies: ICurrency[] = [];
  loading = false;

constructor(private ratesService: RatesService) {

}

  ngOnInit(): void {
    this.loading = true;
    this.ratesService.getCurrency().subscribe((currencies) => {

      const filteredCurrencies = currencies.filter(
        (currency) => currency.cc === "USD" || currency.cc === "EUR"
      );

      filteredCurrencies.map((item) => {
        if (item.cc === "USD") {
          this.rates.USD = Number(item.rate.toFixed(2));
        }
    
        if (item.cc === "EUR") {
          this.rates.EUR = Number(item.rate.toFixed(2));
        }
      });
    })
    this.loading = false;
  }
}