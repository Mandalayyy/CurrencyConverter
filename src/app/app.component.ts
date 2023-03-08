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
  allData: any
  curUSD:number|undefined = 0;
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
      this.curUSD = myData.new_amount
    })
  }

  getCurrencyEU(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      this.curEU = myData.new_amount
    })
  }

  getCurrencyGBP(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
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
  getCurrencyFlagTo(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      if(myData.new_amount)
      this.valueFrom = myData.new_amount
    })
  }
  getCurrencyFlagFrom(have:string,want:string,amount:number){
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
    this.getCurrencyFlagTo(this.flagTo,this.flagFrom,this.valueTo)
  }


  selectChangeFrom(event:any){
    let x =  this.currencys.find(e => e.name == event.value);
    if(x){
      this.selectedCurrencyFrom = x;
    }
    this.flagFrom = event.value;
    console.log(event)
    this.getCurrencyFlagFrom(this.flagFrom,this.flagTo,this.valueFrom)
  }

  onButtonClick(){
    let flag;
    let value;
    flag = this.flagTo;
    value = this.valueTo;
    this.flagTo = this.flagFrom;
    this.valueTo = this.valueFrom
    this.flagFrom = flag;
    this.valueFrom = value;
    flag = this.selectedCurrencyTo;
    this.selectedCurrencyTo = this.selectedCurrencyFrom;
    this.selectedCurrencyFrom = flag
    console.log('to', this.selectedCurrencyTo)
    console.log('from', this.selectedCurrencyFrom)
  }
}



