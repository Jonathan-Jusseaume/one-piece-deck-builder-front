import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'opdb-deck-results',
  templateUrl: './deck-results.component.html',
  styleUrls: ['./deck-results.component.scss']
})
export class DeckResultsComponent implements OnInit {

  @Input() decks: Page<Deck>;

  constructor() { }

  ngOnInit(): void {
  }

}
