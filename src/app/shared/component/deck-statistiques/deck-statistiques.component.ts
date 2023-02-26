import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Deck} from "../../model/class/Deck";

@Component({
    selector: 'opdb-deck-statistiques',
    templateUrl: './deck-statistiques.component.html',
    styleUrls: ['./deck-statistiques.component.scss']
})
export class DeckStatistiquesComponent implements OnInit {

    @Input()
    public deck: Deck;

    @Input()
    public inDetailsDeck: boolean = false;
    public panelOpenStateCostChart: boolean = true;
    public panelOpenStatePieChart: boolean = true;
    public panelOpenStatePowerChart: boolean = true;


    ngOnInit(): void {
    }

}
