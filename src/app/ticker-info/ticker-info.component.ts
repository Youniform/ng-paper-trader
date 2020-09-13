import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticker-info',
  templateUrl: './ticker-info.component.html',
  styleUrls: ['./ticker-info.component.css']
})
export class TickerInfoComponent implements OnInit {

  @Input() ticker: string;

  constructor() { }

  ngOnInit(): void {
  }

}
