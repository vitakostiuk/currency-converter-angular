import { ICurrency } from './models/currency';
import { allCurrencies } from './data/allCurrencies';
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

  // input = '';
  // result = '';
  // selectedOption1 = 'UAH';
  // selectedOption2 = 'UAH';
  // sum = 0;

constructor(private ratesService: RatesService) {

}

  ngOnInit(): void {
    this.loading = true;
    this.ratesService.getCurrency().subscribe((currencies) => {
      console.log(currencies);

      const filteredCurrencies = currencies.filter(
        (currency) => currency.cc === "USD" || currency.cc === "EUR"
      );
      // this.currencies = filteredCurrencies

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
    // throw new Error('Method not implemented.');
  }

  //   convertValue = () => {

  //   // Якщо обидва значення в селектах рівні
  //   if (this.selectedOption1 === this.selectedOption2) {
  //     this.result = this.input; // То записуємо в поле result дані из поля input
  //     // Якщо значення select1 === UAH, то
  //   } else if (this.selectedOption1 === "UAH") {
  //     this.sum = Number(this.input) * this.rates[this.selectedOption1]; // Переводимо суму в UAH
  //     this.result = (this.sum / this.rates[this.selectedOption2 as keyof IRates]).toFixed(2); // Ділимо на курс і округлюємо
  //   } else if (this.selectedOption2 === "UAH") {
  //     this.sum = Number(this.result) * this.rates[this.selectedOption2 as keyof IRates]; // Переводимо суму в UAH
  //     this.result = (this.sum * this.rates[this.selectedOption1 as keyof IRates]).toFixed(2); // Ділимо на курс і округлюємо
  //   } else {
  //     // Якщо значення select1 !== UAH
  //     this.result = (this.rates[this.selectedOption1 as keyof IRates] * this.rates[this.selectedOption2 as keyof IRates]).toFixed(
  //       2
  //     ); // Множимо значення select1 на значення select2
  //   }
  // };

  // handleChangeInput(event: any) {
  //   const value = event.target.value;
  //   this.input = value;
  //   this.result = value;
  //   return this.convertValue();
  // }

  // handleChangeSelect1(event: any) {
  //   this.selectedOption1 = event.target.value;
  //   return this.convertValue();
  // }

  // handleChangeSelect2(event: any) {
  //   this.selectedOption2 = event.target.value;
  //   console.log('select2', event.target.value);
  //   return this.convertValue();
  // }
}