import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'opdb-deck-cost-bar-chart',
    templateUrl: './deck-cost-bar-chart.component.html',
    styleUrls: ['./deck-cost-bar-chart.component.scss']
})
export class DeckCostBarChartComponent implements OnInit, OnChanges {

    @Input()
    public deck: Deck;

    costValues: any[];




    // options
    showXAxis = true;
    showYAxis = false;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = false;

    colorScheme = {
        domain: ['#5AA454']
    };
    yTicks: number[];
    maxNumberCardAtCost: number;


    ngOnInit(): void {
    }

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const countCostCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.showYAxis = false;
        this.deck?.cards?.forEach(card => {
            countCostCards[card.cost] += 1;
            this.showYAxis = true;
        })
        this.maxNumberCardAtCost = Math.max(10, Math.max(...countCostCards));
        this.costValues = [];
        countCostCards.forEach((cost, index) => {
          this.costValues.push({
            name: (index + 1),
            value: cost
          })
        })
    }

    onSelect(event) {
        console.log(event);
    }
    tickFormatting(val: any) {
        return val.toLocaleString()
    }

}
