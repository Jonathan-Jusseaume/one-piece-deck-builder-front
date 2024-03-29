import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Rarity} from "../model/class/Rarity";

@Injectable({
    providedIn: 'root'
})
export class RarityService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<Rarity[]> {
        return this.httpClient.get<Rarity[]>(this._configurationService.getApiUrl() + 'rarities');
    }

}
