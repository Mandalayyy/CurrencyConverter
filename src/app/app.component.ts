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
  valueFrom: number=0;
  valueTo: number=0;
  flagFrom: string = "USD";
  flagTo: string = "USD";
  
  constructor(private data: CurrencyConverterService) {}

  ngOnInit(): void{
    this.getCurrencyUSD("USD","UAH",1);
  }

  getCurrencyUSD(have:string,want:string,amount:number){
    this.data.getData(have,want,amount).subscribe((myData: response)=>{
      this.curUSD = myData.new_amount
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
    this.flagTo = event.target.value;
    this.getCurrencyFlagTo(this.flagTo,this.flagFrom,this.valueTo)
  }


  selectChangeFrom(event:any){
    this.flagFrom = event.target.value;
    this.getCurrencyFlagFrom(this.flagFrom,this.flagTo,this.valueFrom)
  }
}



