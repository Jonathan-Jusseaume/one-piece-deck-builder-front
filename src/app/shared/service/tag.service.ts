import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {Tag} from "../model/class/Tag";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<Tag[]> {
        return this.httpClient.get<Tag[]>(this._configurationService.getApiUrl() + 'tags');
    }

}
