import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'opdb-card-results',
  templateUrl: './card-results.component.html',
  styleUrls: ['./card-results.component.scss']
})
export class CardResultsComponent implements OnInit {

  @Input()
  public cardResult: Page<Card>;

  @Output()
  public pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

  changePage($event: number) {
    this.pageChanged.emit($event);
  }
}
