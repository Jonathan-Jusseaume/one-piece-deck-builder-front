import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../../shared/service/deck.service";
import {switchMap} from "rxjs";

@Component({
    selector: 'opdb-deck-details',
    templateUrl: './deck-details.component.html',
    styleUrls: ['./deck-details.component.scss']
})
export class DeckDetailsComponent implements OnInit {


    public deck: Deck;
    public panelOpenState: boolean = true;
    public panelOpenStateHandShuffler: boolean = true;

    constructor(private activatedRoute: ActivatedRoute, private _deckService: DeckService, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(switchMap(s => this._deckService.read(s.id)))
            .subscribe(deck => {
                this.deck = deck;
            }, error => {
                this.router.navigate(['/search']);
            })
    }

}
