import { ChangeDetectionStrategy,  Component, ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {CurrencyConverterService} from '../services/currency-converter.service';
import { response } from '../services/models';


@Component({
  selector: 'app-currency-value',
  templateUrl: 'app.currencyValue.html',
  styleUrls: ['app.currencyValue.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCurrencyValueComponent{
  title = 'my-app';

  allData: response = {
    new_amount: 0,
    old_amount: 0,
    old_currency: 'USD',
    new_currency: 'USD'
  };


  currencys = [
    {name: 'USD', img: '../assets/usa.png'},
    {name: 'EUR',img: '../assets/eu.png'},
    {name: 'UAH',img: '../assets/ua.png'},
    {name: 'GBP', img: '../assets/gbp.png'},
    {name: 'CAD', img: '../assets/cad.png'},
    {name: 'JPY', img: '../assets/jpy.png'}
  ]

  selectedCurrencyFrom = {name: 'USD', img: '../assets/usa.png'};
  selectedCurrencyTo = {name: 'USD', img: '../assets/usa.png'};
  
  constructor(private data: CurrencyConverterService,private cdr: ChangeDetectorRef) {
  }




  
  getCurrencyValue(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response) => {
      this.allData = myData;
      setTimeout(()=>{
        this.cdr.detectChanges();
      },1000)
      
    })
  }

  getCurrencyValueTo(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response) => {
      this.allData.old_amount = myData.new_amount;
      this.allData.new_amount = myData.old_amount
      setTimeout(()=>{
        this.cdr.detectChanges();
      },1000)
      
    })
  }

  updateCurrency(){
    if(this.allData.old_amount && this.allData.old_currency && this.allData.new_currency){
      this.getCurrencyValue(this.allData.old_currency,this.allData.new_currency,this.allData.old_amount)
     }
  }

  updateCurrencyTo(){
    if(this.allData.new_amount && this.allData.old_currency && this.allData.new_currency){
      this.getCurrencyValueTo(this.allData.new_currency,this.allData.old_currency, this.allData.new_amount)
    }
  }

  inputHandlerValueFrom(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value)
    if(value){
    this.allData.old_amount = value;
    this.updateCurrency();
    }
  }
  inputHandlerValueTo(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value)
    if(value){
      this.allData.new_amount = value;
      this.updateCurrencyTo();
    }
  }

  selectChangeTo(event: MatSelectChange){
    const x =  this.currencys.find(e => e.name == event.value);
    if(x){
      this.selectedCurrencyTo = x;
    }
   this.allData.new_currency = event.value
   this.updateCurrency();
  }


  selectChangeFrom(event: MatSelectChange){
    const x =  this.currencys.find(e => e.name == event.value);
    if(x){
      this.selectedCurrencyFrom = x;
    }
    this.allData.old_currency = event.value;
    this.updateCurrency();
  }

  onButtonClick(){
    let flag;
    flag = this.allData.new_currency;
    this.allData.new_currency = this.allData.old_currency;
    this.allData.old_currency = flag;
    flag = this.selectedCurrencyTo;
    this.selectedCurrencyTo = this.selectedCurrencyFrom;
    this.selectedCurrencyFrom = flag;
    this.updateCurrency();
  }
  
}



