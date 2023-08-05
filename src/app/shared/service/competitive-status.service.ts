import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Type} from "../model/class/Type";
import {CompetitiveStatus} from "../model/class/CompetitiveStatus";

@Injectable({
    providedIn: 'root'
})
export class CompetitiveStatusService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<CompetitiveStatus[]> {
        return this.httpClient.get<CompetitiveStatus[]>(this._configurationService.getApiUrl() + 'competitive-status');
    }

}
