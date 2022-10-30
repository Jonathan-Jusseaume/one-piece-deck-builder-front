import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../service/tag.service";
import {TypeService} from "../../service/type.service";
import {RarityService} from "../../service/rarity.service";
import {ProductService} from "../../service/product.service";

@Component({
    selector: 'opdb-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {

    @Output()
    public formValueChanged: EventEmitter<any> = new EventEmitter<any>();

    private subscriptions: Subscription[] = [];
    public searchForm: FormGroup;
    public colorPlaceHolder: string;
    public tagPlaceHolder: string;
    public typePlaceHolder: string;
    public rarityPlaceHolder: string;
    public costsPlaceHolder: string;
    public powerPlaceHolder: string;
    public productPlaceHolder: string;
    public keywordPlaceHolder: string;
    public colors: Color[];
    public tags: Tag[];
    public types: Type[];
    public rarities: Rarity[];
    public products: Product[];
    public costs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    public powers: number[] = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    public dropdownSettings: any;
    @Input()
    public inSearchPlace: boolean = false;
    panelOpenState: boolean = true;


    constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
                private _translateService: TranslateService, private _tagService: TagService,
                private _typeService: TypeService, private _rarityService: RarityService,
                private _productService: ProductService) {
    }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            keyword: "",
            products: [],
            colors: [],
            tags: [],
            types: [],
            rarities: [],
            costs: [],
            powers: []
        });
        this.subscriptions.push(this._languageService.languageSelectedChanged.subscribe(language => {
            this.initComponents();
        }))

    }

    initComponents() {
        this._translateService.get(['SelectAll', 'UnselectAll', 'ColorFilterPlaceHolder', 'SearchButton',
            'TagFilterPlaceHolder', 'TypeFilterPlaceHolder', 'RarityFilterPlaceHolder', 'CostFilterPlaceHolder',
            'PowerFilterPlaceHolder', 'ProductFilterPlaceHolder', 'KeywordFilterPlaceHolder'])
            .subscribe(translations => {
                this.colorPlaceHolder = translations['ColorFilterPlaceHolder'];
                this.productPlaceHolder = translations['ProductFilterPlaceHolder'];
                this.tagPlaceHolder = translations['TagFilterPlaceHolder'];
                this.typePlaceHolder = translations['TypeFilterPlaceHolder'];
                this.rarityPlaceHolder = translations['RarityFilterPlaceHolder'];
                this.costsPlaceHolder = translations['CostFilterPlaceHolder'];
                this.powerPlaceHolder = translations['PowerFilterPlaceHolder'];
                this.keywordPlaceHolder = translations['KeywordFilterPlaceHolder'];
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
        this.subscriptions.push(this._rarityService.list().subscribe(rarities => {
            this.rarities = rarities;
        }))
        this.subscriptions.push(this._productService.list().subscribe(products => {
            this.products = products;
        }))

    }

    resetSearch() {
        this.searchForm.reset();
        this.formValueChanged.emit(null);
        document.getElementById("top")?.scrollIntoView();
    }

    validForm() {
        this.formValueChanged.emit(this.searchForm);
    }

    ngOnDestroy() {
        this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    }
}
