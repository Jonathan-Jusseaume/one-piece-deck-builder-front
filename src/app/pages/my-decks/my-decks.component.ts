import {Component, OnInit} from '@angular/core';
import {DeckService} from "../../shared/service/deck.service";

@Component({
    selector: 'opdb-my-decks',
    templateUrl: './my-decks.component.html',
    styleUrls: ['./my-decks.component.scss']
})
export class MyDecksComponent implements OnInit {

    decksOfUser: Page<Deck>;

    constructor(private _deckService: DeckService) {
    }

    ngOnInit(): void {
        this.launchSearch(0);
    }

    launchSearch(numberPage: number): void {
        this._deckService.listMyDeck(numberPage).subscribe(result => this.decksOfUser = result);
    }

    changePage($event: number) {
        this.launchSearch($event - 1);
    }
}
