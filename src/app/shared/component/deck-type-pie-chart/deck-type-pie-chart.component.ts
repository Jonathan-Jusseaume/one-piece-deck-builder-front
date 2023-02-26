import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ColorService} from "../../service/color.service";
import {DeckService} from "../../service/deck.service";
import {Deck} from "../../model/class/Deck";

@Component({
    selector: 'opdb-deck-type-pie-chart',
    templateUrl: './deck-type-pie-chart.component.html',
    styleUrls: ['./deck-type-pie-chart.component.scss']
})
export class DeckTypePieChartComponent implements OnInit, OnChanges {

    @Input()
    public deck: Deck;

    values: any[];
    @Input()
    view: number[] = [420, 400];
    colorScheme = {
        domain: ['#337ab7']
    };


    ngOnInit(): void {
    }

    constructor(private _colorService: ColorService, private _deckService: DeckService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updatePieChart();
        this.colorScheme = {
            domain: this._colorService.getCssPieChartColorsFromCardColor(this._deckService.getColorOfDeck(this.deck))
        };
    }

    updatePieChart(): void {
        this.values = [];
        if (this.deck.leader) {
            this.values.push(
                {
                    "name": this.deck.leader.type.label,
                    "value": 1
                }
            )
        }
        const mapTypeNumberCards: Map<string, number> = new Map<string, number>();
        this.deck.cards.forEach(card => {
            if (mapTypeNumberCards.get(card.type.label)) {
                mapTypeNumberCards.set(card.type.label, mapTypeNumberCards.get(card.type.label) + 1);
            } else {
                mapTypeNumberCards.set(card.type.label, 1);
            }
        })
        mapTypeNumberCards.forEach((value, key) => {
            this.values.push({
                "name": key,
                "value": value
            })
        })
    }

}
