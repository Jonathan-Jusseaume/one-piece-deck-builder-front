import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'opdb-card-results',
  templateUrl: './card-results.component.html',
  styleUrls: ['./card-results.component.scss']
})
export class CardResultsComponent implements OnInit {

  @Input()
  public cardResult: Page<Card>;

  constructor() { }

  ngOnInit(): void {
  }

  changePage($event: number) {
    console.log($event);
  }
}
