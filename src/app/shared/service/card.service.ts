import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public search(cardFilter): Observable<Page<Card>> {
        const httpParams = new HttpParams().set('language', this._languageService.getCurrentLanguage());
        return this.httpClient.post<Page<Card>>(this._configurationService.getApiUrl() + 'cards/search',
            cardFilter,
            {params: httpParams});
    }
}
