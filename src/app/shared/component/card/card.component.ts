import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {TypeEnum} from "../../model/constant/TypeEnum";
import {interval, Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";
import {Card} from "../../model/class/Card";
import {FilterService} from "../../service/filter.service";

@Component({
    selector: 'opdb-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    public card: Card;

    public cardShowed: Card;

    @Input()
    public inDeck: boolean = false;

    @Input()
    public countInDeck: number = 0;

    @Input()
    public inHandShuffler: boolean = false;

    @Input()
    public enableEye: boolean = false;

    @Output()
    public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    @Output()
    public cardEyeIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    public currentImageIndex = 0;

    public TypeEnum = TypeEnum;

    private subscriptions: Subscription[] = [];

    public searchFilter: any = null;

    constructor(public _configurationService: ConfigurationService, public _colorService: ColorService,
                private _filterService: FilterService) {
    }

    ngOnInit(): void {
        this.cardShowed = {...this.card};
        this.subscriptions.push(interval(3000).subscribe(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % (this.cardShowed.images.length)
        }))
        this.subscriptions.push(this._filterService.formFilterSubject.subscribe(formValue => {
            this.searchFilter = formValue;
            this.filterRarities();
            this.filterProducts();
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        this.cardShowed = {...changes.card.currentValue};
        this.filterRarities();
        this.filterProducts();
    }

    isClicked(card: Card): void {
        this.cardIsClicked.emit(card);
    }


    eyeClick(card: Card): void {
        this.cardEyeIsClicked.emit(card);
    }

    filterRarities(): void {
        if (this.cardShowed && this.searchFilter && !this.inDeck && !this.inHandShuffler && this.searchFilter?.value
            && this.searchFilter?.value?.rarities?.length) {
            this.cardShowed.images = this.cardShowed.images.filter(image => this.searchFilter?.value?.rarities?.map(rarity => rarity?.id)?.includes(image?.rarity?.id))
            this.currentImageIndex = 0;
        }
    }

    filterProducts(): void {
        if (this.cardShowed && this.searchFilter && !this.inDeck && !this.inHandShuffler && this.searchFilter?.value
            && this.searchFilter?.value?.products?.length) {
            this.cardShowed.images = this.cardShowed.images.filter(image => this.searchFilter?.value?.products?.map(product => product?.id)?.includes(image?.product?.id))
            this.currentImageIndex = 0;
        }
    }

}
