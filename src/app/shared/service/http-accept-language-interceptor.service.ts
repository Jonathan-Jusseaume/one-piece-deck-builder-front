import {Injectable} from '@angular/core';
import {LanguageService} from "./language.service";
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpAcceptLanguageInterceptor {

    constructor(private languageService: LanguageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(
            req.clone({
                setHeaders: {
                    'Accept-Language': `${this.languageService.getCurrentLanguage()}`
                }
            })
        )
    }

}
