import { Component, Input, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { response } from '../../services/models';

@Component({
  selector: 'app-currency',
  templateUrl: 'currency.component.html',
  styleUrls: ['currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  @Input() have = '1';
  @Input() want = '1';
  amount = 1;
  resValue = 0;

  constructor(private data: CurrencyConverterService) {}

  ngOnInit(): void {
    this.getCurrency(this.have, this.want, this.amount);
  }

  getCurrency(have: string, want: string, amount: number): void {
    this.data.getData(have, want, amount).subscribe((myData: response) => {
      if (myData.new_amount) {
        this.resValue = myData.new_amount;
      }
    });
  }
}
