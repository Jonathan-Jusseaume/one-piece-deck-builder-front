import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ColorService} from "../../shared/service/color.service";
import {FormBuilder} from "@angular/forms";
import {LanguageService} from "../../shared/service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../shared/service/tag.service";
import {TypeService} from "../../shared/service/type.service";
import {CardService} from "../../shared/service/card.service";
import {CardModalComponent} from "../../shared/component/card-modal/card-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
                private _typeService: TypeService, private _cardService: CardService,
                private dialog: NgbModal) {
    }

    ngOnInit() {
    }

    launchSearch(numberPage): void {
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

    openCardModal(card: Card): void {
        const indexCardClicked = this.searchResult?.content?.map(card => card.id)?.indexOf(card?.id);
        const modal = this.dialog.open(CardModalComponent, {ariaLabelledBy: 'modal-basic-title'});
        modal.componentInstance.cardList = this.searchResult?.content;
        modal.componentInstance.indexInCardList = indexCardClicked;
        modal.componentInstance.card = card;
        modal.result
            .then()
            .catch();
    }
}
