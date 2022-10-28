import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";

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
    view: number[] = [420, 400];


    ngOnInit(): void {
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription = this.resizeObservable$.subscribe(evt => {
        })
    }

    constructor() {
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
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
        })
    }

    tickFormatting(value: any) {
        return value.toLocaleString()
    }

}
