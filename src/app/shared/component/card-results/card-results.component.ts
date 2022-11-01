import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'opdb-card-results',
    templateUrl: './card-results.component.html',
    styleUrls: ['./card-results.component.scss']
})
export class CardResultsComponent implements OnInit {

    @Input()
    public cardResult: Page<Card>;
    @Input()
    public cardMaxWidth: number = 200;
    @Input()
    public inDeckBuilding: boolean = false;

    @Output()
    public pageChanged: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public cardClick: EventEmitter<Card> = new EventEmitter<Card>();

    public panelOpenState: boolean = true;

    constructor(private _translateService: TranslateService, private dialog: NgbModal) {
    }

    ngOnInit(): void {
    }

    changePage($event: number) {
        this.pageChanged.emit($event);
    }

    cardIsClicked($event: Card) {
        this.cardClick.emit($event);
    }

    openCardModal(cardList: Card[], index: number): void {
        const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        modal.componentInstance.cardList = cardList;
        modal.componentInstance.indexInCardList = index;
        modal.result
            .then()
            .catch();
    }
}
