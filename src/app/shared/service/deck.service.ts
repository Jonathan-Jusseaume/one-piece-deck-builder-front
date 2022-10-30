import {Injectable} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {ConfigurationService} from "./configuration.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class DeckService {

    constructor(private _configurationService: ConfigurationService, private httpClient: HttpClient,
                private _authService: SocialAuthService) {
    }

    public listMyDeck(pageNumber: number): Observable<Page<Deck>> {
        return this._authService.authState.pipe(switchMap(authUser => {
            const httpParams = new HttpParams().set('mail', authUser.email)
                .set('page', pageNumber)
                .set('size', 20)
            return this.httpClient.get<Page<Deck>>(this._configurationService.getApiUrl() + 'decks',
                {params: httpParams});
        }))

    }

    public read(id: string): Observable<Deck> {
        return this.httpClient.get<Deck>(this._configurationService.getApiUrl() + 'decks/' + id);
    }

    public create(deck: Deck): Observable<Deck> {
        return this._authService.authState.pipe(switchMap(authUser => {
            const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + authUser?.idToken)
            return this.httpClient.post<Deck>(this._configurationService.getApiUrl() + 'decks', deck,
                {headers: httpHeaders});
        }))

    }


}
