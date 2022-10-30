import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ColorService} from "../../shared/service/color.service";
import {FormBuilder} from "@angular/forms";
import {LanguageService} from "../../shared/service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../shared/service/tag.service";
import {TypeService} from "../../shared/service/type.service";
import {CardService} from "../../shared/service/card.service";

@Component({
    selector: 'opdb-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    public searchForm: any;
    public searchResult: Page<Card>;

    private subscriptions: Subscription[] = [];

    constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
                private _translateService: TranslateService, private _tagService: TagService,
                private _typeService: TypeService, private _cardService: CardService) {
    }

    ngOnInit() {
    }

    launchSearch(numberPage) {
        this.subscriptions.push(
            this._cardService.search(this.searchForm.value, numberPage, 25)
                .subscribe(result => {
                    this.searchResult = result;
                    document.getElementById("top")?.scrollIntoView();
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    changePage(pageNumber: number): void {
        this.launchSearch(pageNumber - 1);
    }


    formSubmitted(form: any): void {
        if (form == null) {
            this.searchResult = null;
        } else {
            this.searchForm = {...form};
            this.launchSearch(0);
        }
    }
}
