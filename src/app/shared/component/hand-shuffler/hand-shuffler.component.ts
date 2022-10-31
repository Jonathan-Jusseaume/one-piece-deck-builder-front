import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'opdb-hand-shuffler',
    templateUrl: './hand-shuffler.component.html',
    styleUrls: ['./hand-shuffler.component.scss']
})
export class HandShufflerComponent implements OnInit, OnChanges {

    @Input()
    public deck: Deck;

    public cardsInHand: Card[];
    public numbersAlreadyInHand: number[];

    constructor(private dialog: NgbModal) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.shuffleHand();
    }

    shuffleHand(): void {
        this.cardsInHand = [];
        this.numbersAlreadyInHand = [];
        if (this.deck?.cards?.length <= 5) {
            this.cardsInHand = this.deck.cards;
        } else {
            while (this.cardsInHand?.length < 5) {
                const randomNumber = Math.floor(Math.random() * this.deck?.cards?.length);
                if (!this.numbersAlreadyInHand.includes(randomNumber)) {
                    this.cardsInHand.push(this.deck.cards[randomNumber]);
                    this.numbersAlreadyInHand.push(randomNumber);
                }
            }
        }

    }

    openCardModal(card: Card): void {
        const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        modal.componentInstance.card = card;
        modal.result
            .then()
            .catch();
    }
}
