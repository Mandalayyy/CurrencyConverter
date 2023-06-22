import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { response } from '../../services/models';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface Currency {
  name: string;
  img: string;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: 'currency-converter.component.html',
  styleUrls: ['currency-converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent implements OnInit {
  title = 'my-app';

  allData: response = {
    new_amount: 0,
    old_amount: 0,
    old_currency: 'USD',
    new_currency: 'USD'
  };

  currencies: Currency[] = [
    { name: 'USD', img: '../assets/usa.png' },
    { name: 'EUR', img: '../assets/eu.png' },
    { name: 'UAH', img: '../assets/ua.png' },
    { name: 'GBP', img: '../assets/gbp.png' },
    { name: 'CAD', img: '../assets/cad.png' },
    { name: 'JPY', img: '../assets/jpy.png' }
  ];

  selectedCurrencyFrom: Currency = this.currencies[0];
  selectedCurrencyTo: Currency = this.currencies[0];

  fromInputChangeSubject = new Subject<number>();
  toInputChangeSubject = new Subject<number>();

  constructor(private data: CurrencyConverterService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    
    this.fromInputChangeSubject.pipe(debounceTime(300)).subscribe((value) => {
      if(this.allData.old_currency && this.allData.new_currency)
      this.updateCurrency(value, this.allData.old_currency, this.allData.new_currency, 'old_amount');
    });

    this.toInputChangeSubject.pipe(debounceTime(300)).subscribe((value) => {
      if(this.allData.old_currency && this.allData.new_currency)
      this.updateCurrency(value, this.allData.new_currency, this.allData.old_currency, 'new_amount');
    });
  }

  updateCurrency(value: number , have: string, want: string, amountKey: keyof response = 'old_amount') {
    this.data.getData(have, want, value).subscribe((myData: response) => {
      if (amountKey === 'old_amount') {
        this.allData = { ...myData };
      } else {
        this.allData = { ...this.allData, old_amount: myData.new_amount };
      }
      console.log('all', this.allData);
      this.cdr.detectChanges();
    });
  }

  inputHandler(event: Event, inputType: string) {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);

    if (inputType === 'from') {
      this.fromInputChangeSubject.next(value);
    } else if (inputType === 'to') {
      this.toInputChangeSubject.next(value);
    }
  }

  selectChangeTo(event: MatSelectChange) {
    this.updateCurrencyWithSelectedCurrency(event, 'new_currency', 'selectedCurrencyTo');
  }

  selectChangeFrom(event: MatSelectChange) {
    this.updateCurrencyWithSelectedCurrency(event, 'old_currency', 'selectedCurrencyFrom');
  }

  updateCurrencyWithSelectedCurrency(event: MatSelectChange, currencyKey: keyof response, selectedCurrencyKey: keyof this) {
    const selectedCurrency = this.currencies.find((e) => e.name === event.value);
    if (selectedCurrency) {
      this.allData = {
        ...this.allData,
        [currencyKey]: event.value || 'USD'
      };
      this[selectedCurrencyKey] = selectedCurrency as this[keyof this];
      this.updateCurrency(this.allData.old_amount || 0, this.allData.old_currency || 'USD', this.allData.new_currency || 'USD');
    }
  }

  swapCurrencies() {
    [this.allData.old_currency, this.allData.new_currency] = [this.allData.new_currency, this.allData.old_currency];
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [this.selectedCurrencyTo, this.selectedCurrencyFrom];
    if(this.allData.old_amount && this.allData.old_currency && this.allData.new_currency)
    this.updateCurrency(this.allData.old_amount, this.allData.old_currency, this.allData.new_currency);
  }
}
