import {  Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '25c1b31b29mshf0e3b27091d62c8p106082jsn611c0e12d4f3',
      'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
    }
  };

  url = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?';
  constructor(private http:HttpClient) { 
    
  }
  getData(have:string, want:string, amount:number){
    const search = `have=${have}&want=${want}&amount=${amount}`;
    return this.http.get([this.url,search].join(''), this.options);
  }
  
}
