import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'opdb-card-results',
    templateUrl: './card-results.component.html',
    styleUrls: ['./card-results.component.scss']
})
export class CardResultsComponent implements OnInit {

    @Input()
    public cardResult: Page<Deck>;
    @Input()
    public cardMaxWidth: number = 200;

    @Output()
    public pageChanged: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public cardClick: EventEmitter<Card> = new EventEmitter<Card>();

    public previousString: string = 'Previous';
    public nextString: string = 'Next';


    constructor(private _translateService: TranslateService) {
    }

    ngOnInit(): void {
    }

    changePage($event: number) {
        this.pageChanged.emit($event);
    }

    cardIsClicked($event: Card) {
        this.cardClick.emit($event);
    }
}
