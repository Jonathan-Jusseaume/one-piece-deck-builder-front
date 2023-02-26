import {Component, Input, OnInit} from '@angular/core';
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Card} from "../../model/class/Card";
import {Deck} from "../../model/class/Deck";

@Component({
    selector: 'opdb-deck-preview',
    templateUrl: './deck-preview.component.html',
    styleUrls: ['./deck-preview.component.scss']
})
export class DeckPreviewComponent implements OnInit {

    @Input()
    deck: Deck;

    @Input()
    inSearchResults = true;

    isDescription: boolean = false;
    panelOpenState: boolean = true;

    constructor(private dialog: NgbModal) {
    }

    ngOnInit(): void {
    }

    changeDescription($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.isDescription = !this.isDescription;
    }

    openModal(card: Card): void {
        if (!this.inSearchResults) {
            const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
            modal.componentInstance.cardList = [card];
            modal.componentInstance.indexInCardList = 0;
            modal.result
                .then()
                .catch();
        }
    }

}
