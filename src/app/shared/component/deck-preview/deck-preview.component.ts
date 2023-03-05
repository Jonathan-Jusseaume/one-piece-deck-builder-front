import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CardModalComponent} from "../card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Card} from "../../model/class/Card";
import {Deck} from "../../model/class/Deck";
import {Subscription} from "rxjs";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {DeckService} from "../../service/deck.service";

@Component({
    selector: 'opdb-deck-preview',
    templateUrl: './deck-preview.component.html',
    styleUrls: ['./deck-preview.component.scss']
})
export class DeckPreviewComponent implements OnInit, OnDestroy {

    @Input()
    deck: Deck;

    @Input()
    inSearchResults = true;

    isDescription: boolean = false;
    panelOpenState: boolean = true;
    private subscriptions: Subscription[] = [];
    private user: SocialUser;

    constructor(private dialog: NgbModal, private _authService: SocialAuthService,
                private _deckService: DeckService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this._authService.authState.subscribe(user => this.user = user))
    }

    changeDescription($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.isDescription = !this.isDescription;
    }

    openModal(card: Card): void {
        if (!this.inSearchResults) {
            const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
            modal.componentInstance.cardList = [card];
            modal.componentInstance.indexInCardList = 0;
            modal.result
                .then()
                .catch();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription?.unsubscribe());
    }

    changeFavoriteStatus($event: MouseEvent, deck: Deck): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.subscriptions.push(
            this._deckService.favoriteAction(deck).subscribe(returnedDeck => {
                this.deck = returnedDeck;
            })
        )
    }
}
