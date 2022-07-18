import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TypeEnum} from "../../model/constant/TypeEnum";
import {SearchFilterComponent} from "../search-filter/search-filter.component";

@Component({
    selector: 'opdb-deck-visualisation',
    templateUrl: './deck-visualisation.component.html',
    styleUrls: ['./deck-visualisation.component.scss']
})
export class DeckVisualisationComponent implements OnInit {

    @Input()
    public deck: Deck;



    public mapCardIdCountNumber: Map<string, number> = new Map<string, number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    getDistinctCards(deck: Deck): Card[] {
        this.mapCardIdCountNumber = new Map<string, number>();
        const alreadySeenCards: Map<string, boolean> = new Map<string, boolean>();
        const distinctCards: Card[] = [];
        deck?.cards.forEach(card => {
            if (this.mapCardIdCountNumber.get(card.id)) {
                this.mapCardIdCountNumber.set(card.id, this.mapCardIdCountNumber.get(card.id) + 1);
            } else {
                this.mapCardIdCountNumber.set(card.id, 1);
            }
            if (!alreadySeenCards.get(card.id)) {
                distinctCards.push(card);
                alreadySeenCards.set(card.id, true);
            }
        });
        return distinctCards;
    }
}
