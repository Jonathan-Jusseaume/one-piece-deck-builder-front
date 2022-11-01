import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DeckService} from "../../shared/service/deck.service";
import {LanguageService} from "../../shared/service/language.service";
import {FormBuilder} from "@angular/forms";
import {ColorService} from "../../shared/service/color.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'opdb-decks-search',
    templateUrl: './decks-search.component.html',
    styleUrls: ['./decks-search.component.scss']
})
export class DecksSearchComponent implements OnInit {

    public decks: Page<Deck>;

    public searchForm: any;

    public colors: Color[];

    private subscriptions: Subscription[] = [];

    public keywordPlaceHolder: string = '';

    public colorPlaceHolder: string = '';

    public dropdownSettings: any;


    constructor(private _deckService: DeckService, private _languageService: LanguageService,
                private fb: FormBuilder, private _colorService: ColorService, private _translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            keyword: "",
            colors: []
        });
        this.subscriptions.push(this._languageService.languageSelectedChanged.subscribe(() => {
            this.initComponents();
        }))
        this.launchSearch(0);
    }

    initComponents() {
        this._translateService.get(['SelectAll', 'UnselectAll', 'ColorFilterPlaceHolder', 'SearchButton',
            'KeywordFilterPlaceHolderDeck'])
            .subscribe(translations => {
                this.colorPlaceHolder = translations['ColorFilterPlaceHolder'];
                this.keywordPlaceHolder = translations['KeywordFilterPlaceHolderDeck'];
                this.dropdownSettings = {
                    singleSelection: false,
                    idField: 'id',
                    textField: 'label',
                    selectAllText: translations['SelectAll'],
                    unSelectAllText: translations['UnselectAll'],
                    searchPlaceholderText: translations['SearchButton'],
                    allowSearchFilter: true
                };
            });
        this.subscriptions.push(this._colorService.list().subscribe(colors => {
            this.colors = colors;
        }))

    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    }

    launchSearch(pageNumber: number): void {
        this.subscriptions.push(
            this._deckService.search(pageNumber, this.searchForm.value).subscribe(result => this.decks = result)
        );
    }

    changePage(pageNumber: number): void {
        this.launchSearch(pageNumber - 1);
    }

    resetSearch() {
        this.launchSearch(0);
    }

    validForm() {
        this.launchSearch(0);
    }
}
