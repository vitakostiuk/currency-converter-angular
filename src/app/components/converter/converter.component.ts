import { IRates } from './../../models/rates';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html'
})

export class ConverterComponent implements OnInit {
  @Input() rates: IRates;

  input = '';
  result = '';
  selectedOption1 = 'UAH';
  selectedOption2 = 'UAH';
  sum = 0;

  ngOnInit(): void {
  }
  convertValue = () => {
    if (this.selectedOption1 === this.selectedOption2) {
      this.result = this.input; // записуємо в поле result дані из поля input
    }
    
    if (this.selectedOption1 === "UAH") {
      this.sum = Number(this.input) * this.rates[this.selectedOption1 as keyof IRates]; // Переводимо суму в UAH
      this.result = (this.sum / this.rates[this.selectedOption2 as keyof IRates]).toFixed(2); // Ділимо на курс і округлюємо
    }
    
    if (this.selectedOption1 !== "UAH") {
      this.result = (this.rates[this.selectedOption1 as keyof IRates] * this.rates[this.selectedOption2 as keyof IRates]).toFixed(
        2
      ); // Множимо значення select1 на значення select2
    }
  };

  handleChangeInput(event: any) {
    const value = event.target.value;
    this.input = value;
    this.result = value;
    return this.convertValue();
  }

  handleChangeSelect1(event: any) {
    this.selectedOption1 = event.target.value;
    return this.convertValue();
  }

  handleChangeSelect2(event: any) {
    this.selectedOption2 = event.target.value;
    console.log('select2', event.target.value);
    return this.convertValue();
  }
}