import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Product} from "../model/class/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this._configurationService.getApiUrl() + 'products');
    }

}
