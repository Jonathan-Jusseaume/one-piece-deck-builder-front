import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeckService} from "../../service/deck.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Page} from "../../model/class/Page";
import {Deck} from "../../model/class/Deck";

@Component({
    selector: 'opdb-deck-results',
    templateUrl: './deck-results.component.html',
    styleUrls: ['./deck-results.component.scss']
})
export class DeckResultsComponent implements OnInit {

    @Input() public decks: Page<Deck>;

    @Input() public deletable: boolean = false;

    @Output() public hasDeletedDeck: EventEmitter<void> = new EventEmitter<void>();

    public subscriptions: Subscription[] = [];

    constructor(private _deckService: DeckService, private _translateService: TranslateService) {
    }

    ngOnInit(): void {
    }

    deleteDeck($event: MouseEvent, id: string): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.subscriptions.push(
            this._translateService.get(['ConfirmDelete']).subscribe(result => {
                if (confirm(result['ConfirmDelete'])) {
                    this.subscriptions.push(
                        this._deckService.delete(id).subscribe(result => {
                            this.hasDeletedDeck.emit();
                        })
                    )
                }
            })
        );
    }

}
