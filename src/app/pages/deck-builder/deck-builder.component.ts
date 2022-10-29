import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ColorService} from "../../shared/service/color.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LanguageService} from "../../shared/service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../shared/service/tag.service";
import {TypeService} from "../../shared/service/type.service";
import {CardService} from "../../shared/service/card.service";
import {TypeEnum} from "../../shared/model/constant/TypeEnum";
import {SearchFilterComponent} from "../../shared/component/search-filter/search-filter.component";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {compareToCard} from "../../shared/model/utils/compare-to-card";


declare var $: any;

@Component({
    selector: 'opdb-deck-builder',
    templateUrl: './deck-builder.component.html',
    styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit, OnDestroy {

    @ViewChild(SearchFilterComponent) filtersComponent: SearchFilterComponent;
    private subscriptions: Subscription[] = [];
    public searchResult: Page<Card>;
    public searchForm: any;
    public deckIsNotValid: boolean = false;
    public deck: Deck;
    public statisticsText = 'Statistics';
    public handText: string = 'Hand Shuffler';
    public saveText: string = 'Save Deck';
    public isUserConnected: boolean = false;
    public loading: boolean = true;
    public isDeckValid: boolean = false;

    constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
                private _translateService: TranslateService, private _tagService: TagService,
                private _typeService: TypeService, private _cardService: CardService,
                private _authService: SocialAuthService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('deck')) {
            this.deck = JSON.parse(sessionStorage.getItem('deck'))
        } else {
            this.deck = {
                creationDate: undefined,
                user: undefined, description: "", name: "", id: null, leader: null, cards: []
            }
        }
        this._translateService.get(['Statistics', 'HandShuffler', 'SaveText'])
            .subscribe(translations => {
                this.loading = false;
                this.statisticsText = translations['Statistics'];
                this.handText = translations['HandShuffler'];
                this.saveText = translations['SaveText'];
                this.changeDetectorRef.detectChanges();
            });

        this.searchForm = this.fb.group({
            keyword: "",
            products: [],
            colors: [],
            tags: [],
            types: [],
            rarities: [],
            costs: [],
            powers: []
        });
        this.launchSearch(0);
        this._authService.authState.subscribe((user) => {
            if (user) {
                this.isUserConnected = true;
                this.loading = true;
                this.changeDetectorRef.detectChanges();
                this.loading = false;
                this.changeDetectorRef.detectChanges();
            }
        });
        this.isDeckValid = this.checkDeckValidity();

    }

    launchSearch(numberPage): void {
        this.subscriptions.push(
            this._cardService.search(this.searchForm.value, numberPage, 15).subscribe(result => {
                this.searchResult = result;
                document.getElementById("top")?.scrollIntoView();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    changePage(newPage: number): void {
        this.launchSearch(newPage - 1);
    }


    formSubmitted($event: any): void {
        if ($event == null) {
            this.filtersComponent.searchForm.reset()
            this.filtersComponent.validForm();
        } else {
            this.searchForm = {...$event};
        }
        this.launchSearch(0);
    }


    addCardToDeck(cardSelected: Card): void {
        if (cardSelected.type.id === TypeEnum.LEADER) {
            this.deck.leader = {...cardSelected};
            this.filtersComponent.searchForm.patchValue({colors: cardSelected.colors})
            this.filtersComponent.validForm();
            this.deck.cards = this.deck?.cards?.filter(card => this.hasCardColorOfLeader(card, this.deck, false));
        } else {
            if (this.canCardBeAddedToDeck(cardSelected, this.deck)) {
                this.deck.cards.push({...cardSelected});
            }
        }
        this.updateDeckSessionStorageAndValidity();
    }

    canCardBeAddedToDeck(cardSelected: Card, deck: Deck): boolean {
        if (deck?.cards?.length >= 50) {
            this.showErrorMessage("Nombre max de cartes atteints");
            return false;
        }

        if (!this.hasCardColorOfLeader(cardSelected, deck, true)) {
            return false;
        }
        if (deck?.cards?.filter(card => card?.id === cardSelected?.id)?.length === 4) {
            this.showErrorMessage("Impossible d'avoir plus de quatre fois la même carte");
            return false;
        }
        return true;
    }

    hasCardColorOfLeader(cardSelected: Card, deck: Deck, displayMessage: boolean): boolean {
        if (!deck?.leader) {
            if (displayMessage) {
                this.showErrorMessage("Ajouter un leader au deck");
            }
            return false;
        }
        if (deck?.leader?.colors.filter(color => cardSelected?.colors
            ?.map(color => color?.id)?.includes(color?.id))?.length) {
            return true;
        }
        if (displayMessage) {
            this.showErrorMessage("La carte doit être de la même couleur que votre leader");
        }
        return false;
    }

    eraseDeck(): void {
        sessionStorage.removeItem('deck');
        this.deck = {
            creationDate: undefined,
            user: undefined,
            description: "",
            name: "",
            id: null,
            leader: null,
            cards: []
        };
    }


    deleteCardFromDeck(cardClicked: Card): void {
        if (cardClicked.type.id === TypeEnum.LEADER) {
            this.deck.leader = null;
        } else {
            const indexCardToDelete = this.deck.cards.map(card => card.id).lastIndexOf(cardClicked.id);
            if (indexCardToDelete !== -1) {
                this.deck.cards.splice(indexCardToDelete, 1);
            }
        }
        this.updateDeckSessionStorageAndValidity();
    }

    showErrorMessage(text): void {
        $.notify({
            icon: "pe-7s-attention",
            message: text
        }, {
            type: 'danger',
            timer: 100,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    private checkDeckValidity(): boolean {
        if (!this.deck?.leader) {
            return false;
        }
        if (this.deck?.cards?.length !== 50) {
            return false;
        }
        if (this.deck?.cards?.some(card => !this.hasCardColorOfLeader(card, this.deck, false))) {
            return false;
        }
        const cardsId = this.deck?.cards?.map(card => card?.id);
        let hasACardMoreThanFourTimes = false;
        cardsId.forEach(cardId => {
            if (this.deck?.cards?.filter(card => card?.id === cardId)?.length > 4) {
                hasACardMoreThanFourTimes = true;
            }
        });
        if (hasACardMoreThanFourTimes) {
            return false;
        }
        return true;
    }

    private updateDeckSessionStorageAndValidity(): void {
        this.deck?.cards?.sort((card, card2) => compareToCard(card, card2));
        sessionStorage.setItem('deck', JSON.stringify(this.deck));
        this.deck = JSON.parse(sessionStorage.getItem('deck'))
        this.isDeckValid = this.checkDeckValidity();
    }
}
