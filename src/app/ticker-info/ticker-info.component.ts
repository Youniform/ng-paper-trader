import {Component, OnInit,  Input} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from 'src/shared/data.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ticker-info',
  templateUrl: './sssticker-info.component.html',
  styleUrls: ['./ticker-info.component.css']
})
export class TickerInfoComponent implements OnInit {

  @Input() ticker: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
