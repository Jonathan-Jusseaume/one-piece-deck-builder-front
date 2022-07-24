import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../service/tag.service";
import {TypeService} from "../../service/type.service";
import {RarityService} from "../../service/rarity.service";

@Component({
  selector: 'opdb-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Output()
  public formValueChanged: EventEmitter<any> = new EventEmitter<any>();



  private subscriptions: Subscription[] = [];
  public searchForm: FormGroup;
  public colorPlaceHolder: string;
  public tagPlaceHolder: string;
  public typePlaceHolder: string;
  public rarityPlaceHolder: string;
  public colors: Color[];
  public tags: Tag[];
  public types: Type[];
  public rarities: Rarity[];
  public dropdownSettings: any;


  constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
              private _translateService: TranslateService, private _tagService: TagService,
              private _typeService: TypeService, private _rarityService: RarityService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      colors: [],
      tags: [],
      types: [],
      rarities: []
    });
    this.subscriptions.push(this._languageService.languageSelectedChanged.subscribe(language => {
      this.initComponents();
    }))

  }

  initComponents() {
    this._translateService.get(['SelectAll', 'UnselectAll', 'ColorFilterPlaceHolder', 'SearchButton',
      'TagFilterPlaceHolder', 'TypeFilterPlaceHolder', 'RarityFilterPlaceHolder'])
        .subscribe(translations => {
          this.colorPlaceHolder = translations['ColorFilterPlaceHolder'];
          this.tagPlaceHolder = translations['TagFilterPlaceHolder'];
          this.typePlaceHolder = translations['TypeFilterPlaceHolder'];
          this.rarityPlaceHolder = translations['RarityFilterPlaceHolder'];
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

  }

  resetSearch() {
    this.searchForm.reset();
    this.formValueChanged.emit(null);
    document.getElementById("top")?.scrollIntoView();
  }

  validForm() {
    this.formValueChanged.emit(this.searchForm);
  }
}
