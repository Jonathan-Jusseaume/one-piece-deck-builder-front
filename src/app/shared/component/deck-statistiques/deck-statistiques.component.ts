import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'opdb-deck-statistiques',
    templateUrl: './deck-statistiques.component.html',
    styleUrls: ['./deck-statistiques.component.scss']
})
export class DeckStatistiquesComponent implements OnInit {

    @Input()
    public deck: Deck;

    ngOnInit(): void {
    }

}
