import {Component, Input, OnInit, SecurityContext} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {marked} from 'marked';

@Component({
    selector: 'opdb-save-deck',
    templateUrl: './save-deck.component.html',
    styleUrls: ['./save-deck.component.scss']
})
export class SaveDeckComponent implements OnInit {

    @Input()
    deck: Deck;
    deckForm: any;
    isMarkdownMode: boolean = false;
    heightTextArea: string = "";

    constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.deckForm = this.fb.group({
            name: "",
            description: ""
        });
    }

    resetSearch() {

    }

    validForm() {

    }

    changeMode() {
        this.isMarkdownMode = !this.isMarkdownMode;
    }

}
