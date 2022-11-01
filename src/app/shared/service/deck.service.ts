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

    search(pageNumber: number, deckFilter: any): Observable<Page<Deck>> {
        let httpParams = new HttpParams()
            .set('page', pageNumber)
            .set('size', 20)
        httpParams = DeckService.addFilterParamsToSearchQuery(deckFilter, httpParams);
        return this.httpClient.get<Page<Deck>>(this._configurationService.getApiUrl() + 'decks',
            {params: httpParams});
    }

    public listMyDeck(pageNumber: number): Observable<Page<Deck>> {
        return this._authService.authState.pipe(switchMap(authUser => {
            const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + authUser?.idToken)
            const httpParams = new HttpParams()
                .set('page', pageNumber)
                .set('size', 20)
            return this.httpClient.get<Page<Deck>>(this._configurationService.getApiUrl() + 'decks',
                {params: httpParams, headers: httpHeaders});
        }));
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

    private static addFilterParamsToSearchQuery(deckFilter: any, httpParams: HttpParams): HttpParams {
        if (deckFilter?.colors?.length) {
            httpParams = httpParams.set('colorId', deckFilter.colors.map(color => color?.id).join(","));
        }
        if (deckFilter?.keyword && deckFilter?.keyword !== '') {
            httpParams = httpParams.set('keyword', deckFilter.keyword);
        }
        return httpParams;
    }


}
