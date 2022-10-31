import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../../shared/service/deck.service";
import {Subscription, switchMap} from "rxjs";
import {CardModalComponent} from "../../shared/component/card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LanguageService} from "../../shared/service/language.service";

@Component({
    selector: 'opdb-deck-details',
    templateUrl: './deck-details.component.html',
    styleUrls: ['./deck-details.component.scss']
})
export class DeckDetailsComponent implements OnInit, OnDestroy {


    public deck: Deck;
    public panelOpenStateCardList: boolean = true;
    public panelOpenStateHandShuffler: boolean = true;

    private subscriptions: Subscription[] = [];

    constructor(private activatedRoute: ActivatedRoute, private _deckService: DeckService, private router: Router,
                private dialog: NgbModal, private _languageService: LanguageService) {
    }

    ngOnInit(): void {
        this.searchDeck();
        this.subscriptions.push(this._languageService.languageSelectedChanged.subscribe(() => {
            this.searchDeck();
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    }

    searchDeck(): void {
        this.subscriptions.push(
            this.activatedRoute.params.pipe(switchMap(s => this._deckService.read(s.id)))
                .subscribe(deck => {
                    this.deck = deck;
                }, () => {
                    this.router.navigate(['/search']).then();
                }, () => {
                })
        );
    }


    openModal(card: Card): void {
        const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        modal.componentInstance.card = card;
        modal.result
            .then()
            .catch();
    }
}
