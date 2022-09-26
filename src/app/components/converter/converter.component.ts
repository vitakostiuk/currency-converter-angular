import { ICurrency } from './../../models/currency';
import { IRates } from './../../models/rates';
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html'
})

export class ConverterComponent implements OnInit {
  @Input() rates: IRates;
  @Input() currencies: ICurrency[];
  @Input() currency: ICurrency;

  converterForm1 = new FormGroup({
    input: new FormControl(''),
    selectedOption1: new FormControl('UAH'),
  });

  converterForm2 = new FormGroup({
    result: new FormControl('0'),
    selectedOption2: new FormControl('UAH'),
  });


  ngOnInit(): void {
    // this.converterForm1.valueChanges.subscribe(value => console.log('converterForm1', value));
    // this.converterForm2.valueChanges.subscribe(value => console.log('converterForm2', value));
  }

  convertValue = () => {
    const input = this.converterForm1.value.input;
    const selectedOption1 = this.converterForm1.value.selectedOption1;
    const result = this.converterForm2.value.result;
    const selectedOption2 = this.converterForm2.value.selectedOption2;
    let sum = 0;

    if(selectedOption1 === selectedOption2) {
      return this.converterForm2.patchValue({
        result: input,
      });
    }

    if(selectedOption1 === "UAH") {
      sum = Number(input) * this.rates[selectedOption1 as keyof IRates];
      return this.converterForm2.patchValue({
        result: (sum / this.rates[selectedOption2 as keyof IRates]).toFixed(2),
      })
    }

    if(selectedOption2 === "UAH") {
      sum = Number(result) * this.rates[selectedOption2 as keyof IRates];
      return this.converterForm2.patchValue({
        result: (sum * this.rates[selectedOption1 as keyof IRates]).toFixed(2),
      }) 
    }

    return this.converterForm2.patchValue({
      result: (this.rates[selectedOption1 as keyof IRates] * this.rates[selectedOption2 as keyof IRates]).toFixed(2),
    })
  };


  handleChangeInput() {
    this.converterForm1.patchValue({
      input: this.converterForm1.value.input,
    }) 
    return this.convertValue();
  }

  handleChangeSelect1() {
    this.converterForm1.patchValue({
      selectedOption1: this.converterForm1.value.selectedOption1,
    })
    return this.convertValue();
  }

  handleChangeSelect2() {
    this.converterForm2.patchValue({
      selectedOption2: this.converterForm2.value.selectedOption2,
    }) 
    return this.convertValue();
  }
}