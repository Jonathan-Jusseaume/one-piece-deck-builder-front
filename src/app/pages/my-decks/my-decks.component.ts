import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../../shared/service/deck.service";
import {Subscription} from "rxjs";
import {Deck} from "../../shared/model/class/Deck";
import {Page} from "../../shared/model/class/Page";

@Component({
    selector: 'opdb-my-decks',
    templateUrl: './my-decks.component.html',
    styleUrls: ['./my-decks.component.scss']
})
export class MyDecksComponent implements OnInit, OnDestroy {

    public decksOfUser: Page<Deck>;

    private subscriptions: Subscription[] = [];

    constructor(private _deckService: DeckService) {
    }

    ngOnInit(): void {
        this.launchSearch(0);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    }

    launchSearch(pageNumber: number): void {
        this.subscriptions.push(
            this._deckService.listMyDeck(pageNumber).subscribe(result => this.decksOfUser = result)
        );
    }

    changePage(pageNumber: number): void {
        this.launchSearch(pageNumber - 1);
    }
}
