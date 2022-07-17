import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ColorService} from "../../shared/service/color.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LanguageService} from "../../shared/service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../shared/service/tag.service";
import {TypeService} from "../../shared/service/type.service";
import {CardService} from "../../shared/service/card.service";
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
    selector: 'opdb-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {


    private subscriptions: Subscription[] = [];
    public colors: Color[];
    public tags: Tag[];
    public types: Type[];
    public dropdownSettings: any;
    public searchForm: FormGroup;
    public colorPlaceHolder: string;
    public tagPlaceHolder: string;
    public typePlaceHolder: string;
    public searchResult: Page<Card>;

    constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
                private _translateService: TranslateService, private _tagService: TagService,
                private _typeService: TypeService, private _cardService: CardService) {
    }

    ngOnInit() {
        this.subscriptions.push(this._languageService.languageSelectedChanged.subscribe(language => {
            this.initComponents();
        }))
    }

    initComponents() {
        this._translateService.get(['SelectAll', 'UnselectAll', 'ColorFilterPlaceHolder', 'SearchButton',
            'TagFilterPlaceHolder', 'TypeFilterPlaceHolder'])
            .subscribe(translations => {
                this.colorPlaceHolder = translations['ColorFilterPlaceHolder'];
                this.tagPlaceHolder = translations['TagFilterPlaceHolder'];
                this.typePlaceHolder = translations['TypeFilterPlaceHolder'];
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
        this.subscriptions.push(this._tagService.list().subscribe(tags => {
            this.tags = tags;
        }))
        this.subscriptions.push(this._typeService.list().subscribe(types => {
            this.types = types;
        }))
        this.searchForm = this.fb.group({
            colors: [],
            tags: [],
            types: []
        });
    }

    launchSearch() {
        this.subscriptions.push(
            this._cardService.search(this.searchForm.value).subscribe(result => {
                this.searchResult = result;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
