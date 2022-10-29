import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'opdb-deck-preview',
    templateUrl: './deck-preview.component.html',
    styleUrls: ['./deck-preview.component.scss']
})
export class DeckPreviewComponent implements OnInit {

    @Input()
    deck: Deck;

    constructor() {
    }

    ngOnInit(): void {
    }

}
