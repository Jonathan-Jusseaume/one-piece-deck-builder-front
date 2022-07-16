import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private languageSelectedSubject: Subject<string>;
    public languageSelectedChanged: Observable<string>;
    private currentLanguage: string;

    constructor(private _translateService: TranslateService) {
        this.languageSelectedSubject = new BehaviorSubject<string>(this._translateService.currentLang);
        this.currentLanguage = this._translateService.currentLang;
        this.languageSelectedChanged = this.languageSelectedSubject.asObservable();
    }

    public setLanguage(language: string) {
        this._translateService.use(language);
        sessionStorage.setItem('lang', language);
        this.currentLanguage = language;
        this.languageSelectedSubject.next(language);
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}
