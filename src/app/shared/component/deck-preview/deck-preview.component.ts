import {Component, Input, OnInit} from '@angular/core';
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

    openModal(card: Card) {
        console.log(card);
        if (!this.inSearchResults) {
            this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'}).result
                .then()
                .catch();
        }
    }

}
