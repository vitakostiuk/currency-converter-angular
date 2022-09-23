import { IRates } from './../../models/rates';
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html'
})

export class RatesComponent {
  @Input() rates: IRates;
}