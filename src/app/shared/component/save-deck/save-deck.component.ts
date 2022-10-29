import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DeckService} from "../../service/deck.service";
import {Router} from "@angular/router";

@Component({
    selector: 'opdb-save-deck',
    templateUrl: './save-deck.component.html',
    styleUrls: ['./save-deck.component.scss']
})
export class SaveDeckComponent implements OnInit {

    @Input()
    deck: Deck;

    @Input()
    isDeckValid: boolean = false;

    deckForm: any;
    isMarkdownMode: boolean = false;
    heightTextArea: string = "";

    constructor(private fb: FormBuilder, private _deckService: DeckService, private router: Router) {
    }

    ngOnInit(): void {
        this.deckForm = this.fb.group({
            name: ["", [Validators.maxLength(100), Validators.required]],
            description: ["", Validators.maxLength(5000)]
        });
    }


    validForm(): void {
        this.deck.description = this.deckForm.value.description;
        this.deck.name =  this.deckForm.value.name;
        this._deckService.create(this.deck).subscribe(result => {
            this.router.navigate(["/my-decks"])
        });
    }

    changeMode() {
        this.isMarkdownMode = !this.isMarkdownMode;
    }

    isFormValid(): boolean {
        return this.deckForm?.valid && this.isDeckValid;
    }
}
