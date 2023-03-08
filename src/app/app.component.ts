import { Component, OnInit } from '@angular/core';
import {CurrencyConverterService} from './services/currency-converter.service';
import { response } from './services/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  curUSD:number= 0;
  curEU: number | undefined = 0;
  curGBP: number| undefined = 0;
  valueFrom: number=0;
  valueTo: number=0;
  flagFrom: string = "USD";
  flagTo: string = "USD";
  currencys = [
    {name: 'USD', img: '../assets/usa.png'},
    {name: 'EUR',img: '../assets/eu.png'},
    {name: 'UAH',img: '../assets/ua.png'}
  ]
  selectedCurrencyFrom = {name: 'USD', img: '../assets/usa.png'};
  selectedCurrencyTo = {name: 'USD', img: '../assets/usa.png'};

  
  constructor(private data: CurrencyConverterService) {}

  ngOnInit(): void{
    this.getCurrencyUSD("USD","UAH",1);
    this.getCurrencyEU("EUR","UAH",1);
    this.getCurrencyGBP("GBP","UAH",1);
  }

  getCurrencyUSD(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.curUSD = myData.new_amount
    })
  }

  getCurrencyEU(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.curEU = myData.new_amount
    })
  }

  getCurrencyGBP(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.curGBP = myData.new_amount
    })
  }

  getCurrencyValueTo(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.valueFrom = myData.new_amount
    })
  }
  getCurrencyValueFrom(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.valueTo = myData.new_amount
    })
  }
  getCurrencyFlagChanged(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.valueTo = myData.new_amount
    })
  }

  inputHandlerValueFrom(event:any){
    if(event.target.value){
    this.valueFrom = event.target.value;
    this.getCurrencyValueFrom(this.flagFrom,this.flagTo,this.valueFrom)
    }
  }
  inputHandlerValueTo(event:any){
    if(event.target.value){
      this.valueTo = event.target.value;
      this.getCurrencyValueTo(this.flagTo,this.flagFrom, this.valueTo)
    }
  }

  selectChangeTo(event:any){
    let x =  this.currencys.find(e => e.name == event.value);
    if(x){
      this.selectedCurrencyTo = x;
    }
   console.log(this.selectedCurrencyTo) 
   this.flagTo = event.value
    this.getCurrencyFlagChanged(this.selectedCurrencyFrom.name,this.selectedCurrencyTo.name,this.valueFrom)
  }


  selectChangeFrom(event: any){
    let x =  this.currencys.find(e => e.name == event.value);
    if(x){
      this.selectedCurrencyFrom = x;
    }
    this.flagFrom = event.value;
    this.getCurrencyFlagChanged(this.selectedCurrencyFrom.name,this.selectedCurrencyTo.name,this.valueFrom)
  }

  onButtonClick(){
    let flag;
    flag = this.flagTo;
    this.flagTo = this.flagFrom;
    this.flagFrom = flag;
    flag = this.selectedCurrencyTo;
    this.selectedCurrencyTo = this.selectedCurrencyFrom;
    this.selectedCurrencyFrom = flag;
    this.getCurrencyValueFrom(this.flagFrom,this.flagTo, this.valueFrom);
  }

  
}



