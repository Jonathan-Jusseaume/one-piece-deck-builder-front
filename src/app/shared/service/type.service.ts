import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<Type[]> {
        return this.httpClient.get<Type[]>(this._configurationService.getApiUrl() + 'types');
    }

}
