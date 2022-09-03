import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";

@Component({
    selector: 'opdb-deck-power-bar-chart',
    templateUrl: './deck-power-bar-chart.component.html',
    styleUrls: ['./deck-power-bar-chart.component.scss']
})
export class DeckPowerBarChartComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    public deck: Deck;
    public resizeObservable$: Observable<any>;
    public resizeSubscription: Subscription;

    dataPower: any[];
    showXAxis = true;
    showYAxis = false;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = false;

    colorScheme = {
        domain: ['#87CB16']
    };
    yTicks: number[];
    maxNumberCardAtPower: number;


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
        const countPowerCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.showYAxis = false;
        countPowerCards[this.deck?.leader?.power / 1000] += 1;
        this.deck?.cards?.forEach(card => {
            if (card.power) {
                countPowerCards[card.power / 1000] += 1;
            }
            this.showYAxis = true;
        })
        this.maxNumberCardAtPower = Math.max(10, Math.max(...countPowerCards));
        this.dataPower = [];
        countPowerCards.forEach((numberPower, index) => {
            this.dataPower.push({
                name: (index * 1000),
                value: numberPower
            })
        })
    }

    tickFormatting(value: any) {
        return value.toLocaleString()
    }

}
