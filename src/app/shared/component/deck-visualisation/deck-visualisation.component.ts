import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Card} from "../../model/class/Card";
import {Deck} from "../../model/class/Deck";
import {compareToCard} from "../../model/utils/compare-to-card";

@Component({
    selector: 'opdb-deck-visualisation',
    templateUrl: './deck-visualisation.component.html',
    styleUrls: ['./deck-visualisation.component.scss']
})
export class DeckVisualisationComponent implements OnInit {

    @Input()
    public deck: Deck;

    @Input()
    public isBuilding: boolean = true;

    @Output()
    public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    public mapCardIdCountNumber: Map<string, number> = new Map<string, number>();

    constructor(private dialog: NgbModal) {
    }

    ngOnInit(): void {
    }

    getDistinctCardsFromDeck(deck: Deck): Card[] {
        this.deck?.cards?.sort((card, card2) => compareToCard(card, card2));
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

    clickCard($cardClicked: Card) {
        this.cardIsClicked.emit($cardClicked);
    }

    openModal(indexCardClicked: number): void {
        const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        modal.componentInstance.cardList = this.getDistinctCardsFromDeck(this.deck);
        modal.componentInstance.indexInCardList = indexCardClicked;
        modal.result
            .then()
            .catch();
    }
}
