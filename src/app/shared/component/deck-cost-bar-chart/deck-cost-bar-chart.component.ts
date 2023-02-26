import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {DeckService} from "../../service/deck.service";
import {ColorService} from "../../service/color.service";
import {Deck} from "../../model/class/Deck";

@Component({
    selector: 'opdb-deck-cost-bar-chart',
    templateUrl: './deck-cost-bar-chart.component.html',
    styleUrls: ['./deck-cost-bar-chart.component.scss']
})
export class DeckCostBarChartComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    public deck: Deck;
    public resizeObservable$: Observable<any>;
    public resizeSubscription: Subscription;

    dataCost: any[];
    showXAxis = true;
    showYAxis = false;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = false;

    colorScheme = {
        domain: ['#337ab7']
    };
    yTicks: number[];
    maxNumberCardAtCost: number;

    @Input()
    view: number[] = [420, 400];

    ngOnInit(): void {
    }

    constructor(private _deckService: DeckService, private _colorService: ColorService) {
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateCountChart();
        this.colorScheme = {
            domain: [this._colorService.getCssColorFromCardColor(this._deckService.getColorOfDeck(this.deck))]
        };
    }

    tickFormatting(value: any) {
        return value.toLocaleString()
    }

    updateCountChart(): void {
        const countCostCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.showYAxis = false;
        this.deck?.cards?.forEach(card => {
            countCostCards[card.cost - 1] += 1;
            this.showYAxis = true;
        })
        this.maxNumberCardAtCost = Math.max(10, Math.max(...countCostCards));
        this.dataCost = [];
        countCostCards.forEach((cost, index) => {
            this.dataCost.push({
                name: (index + 1),
                value: cost
            })
        });
    }


}
