import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {TypeEnum} from "../../model/constant/TypeEnum";
import {interval, Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";

@Component({
    selector: 'opdb-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

    @Input()
    public card: Card;

    @Input()
    public inDeck: boolean = false;

    @Input()
    public countInDeck: number = 0;

    @Input()
    public enableEye: boolean = false;

    @Output()
    public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    @Output()
    public cardEyeIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    public currentImageIndex = 0;

    public TypeEnum = TypeEnum;

    private subscriptions: Subscription[] = [];

    constructor(public _configurationService: ConfigurationService, public _colorService: ColorService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(interval(3000).subscribe(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % (this.card.images.length)
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

    isClicked(card: Card): void {
        this.cardIsClicked.emit(card);
    }


    eyeClick(card: Card): void {
        this.cardEyeIsClicked.emit(card);
    }
}
