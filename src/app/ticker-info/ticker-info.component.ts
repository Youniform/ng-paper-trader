import {Component, OnInit,  Input} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from 'src/shared/data.service';
import { switchMap } from 'rxjs/operators';
import { StockInfo } from '../../models/stock-info';

@Component({
  selector: 'app-ticker-info',
  templateUrl: './ticker-info.component.html',
  styleUrls: ['./ticker-info.component.css']
})
export class TickerInfoComponent implements OnInit {

  @Input() ticker: string;

  constructor(private dataService: DataService) { }

  stockInfo: StockInfo;
  subscription: Subscription;
  stockInformation: any;

  ngOnInit(): void {
    this.stockInfo = null;
    if (this.ticker && this.ticker !== ''){
      this.subscription = timer(0, 500).pipe(switchMap(() => this.dataService.getStockInformation(this.ticker))).subscribe(result => {
          let response: any;
          response = result;
          if (response.chart && response.chart.result) {
            if (response.chart.result.length > 0) {
              this.stockInformation = response.chart.result[0].meta;
              const stockIndicators = response.chart.result[0].indicators.quote[0];
              this.stockInfo = new StockInfo();
              this.stockInfo.displayName = this.stockInformation.symbol;
              this.stockInfo.currentPrice = this.stockInformation.regularMarketPrice;
              this.stockInfo.changeinPoints = this.stockInformation.regularMarketPrice - this.stockInformation.chartPreviousClose;
              this.stockInfo.isPositive = (this.stockInformation.regularMarketPrice - this.stockInformation.chartPreviousClose) > 0;
              this.stockInfo.currency = this.stockInformation.currency;
              this.stockInfo.percentageGains = ((this.stockInformation.regularMarketPrice - this.stockInformation.chartPreviousClose) /
                this.stockInformation.regularMarketPrice) * 100;
              this.stockInfo.exchangeName = this.stockInformation.exchangeName;
              this.stockInfo.previousClose = this.stockInformation.previousClose;
              this.stockInfo.closePrice = stockIndicators.close[0];
              this.stockInfo.openPrice = stockIndicators.open[0];
              this.stockInfo.highPrice = stockIndicators.high[0];
              this.stockInfo.lowPrice = stockIndicators.low[0];
              this.stockInfo.volume = stockIndicators.volume[0];
            }
          }
        });
    }
  }
  ngOnDestroy(){
    this.stockInformation = null;
    this.subscription.unsubscribe();
  }

}
