import { ICurrency } from './../../models/currency';
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html'
})

export class RatesComponent {
  @Input() currency: ICurrency;
}