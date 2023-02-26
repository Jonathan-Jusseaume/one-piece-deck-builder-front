import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";
import {DeckService} from "../../service/deck.service";
import {Deck} from "../../model/class/Deck";

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
        domain: ['#337ab7']
    };
    yTicks: number[];
    maxNumberCardAtPower: number;
    @Input()
    view: number[] = [420, 400];


    ngOnInit(): void {
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription = this.resizeObservable$.subscribe(evt => {
        })
    }

    constructor(private _colorService: ColorService, private _deckService: DeckService) {
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updatePowerChart();
        this.colorScheme = {
            domain: [this._colorService.getCssColorFromCardColor(this._deckService.getColorOfDeck(this.deck))]
        };
    }

    tickFormatting(value: any) {
        return value.toLocaleString()
    }

    updatePowerChart(): void {
        const countPowerCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.showYAxis = false;
        countPowerCards[this.deck?.leader?.power / 1000] += 1;
        this.deck?.cards?.forEach(card => {
            if (card?.power) {
                countPowerCards[Math.min(card.power / 1000, 10)] += 1;
            }
            this.showYAxis = true;
        })
        this.maxNumberCardAtPower = Math.max(10, Math.max(...countPowerCards));
        this.dataPower = [];
        countPowerCards.forEach((numberPower, index) => {
            let label_name = (index * 1000).toString();
            if (index === 10) {
                label_name = "> 10000";
            }
            this.dataPower.push({
                name: label_name,
                value: numberPower
            })
        })
    }

}
