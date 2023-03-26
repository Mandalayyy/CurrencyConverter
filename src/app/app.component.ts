import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  topCurrencys = [
    {have: 'USD', want:'UAH'},
    {have: 'EUR', want:'UAH'},
    {have: 'GBP', want:'UAH'},
];
  
}



