import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {ConfigurationService} from "./configuration.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Deck} from "../model/class/Deck";
import {Page} from "../model/class/Page";
import {Color} from "../model/class/Color";


@Injectable({
    providedIn: 'root'
})
export class DeckService {

    public currentDeckChange: BehaviorSubject<Deck> = new BehaviorSubject(null);

    constructor(private _configurationService: ConfigurationService, private httpClient: HttpClient,
                private _authService: SocialAuthService) {
    }

    public search(pageNumber: number, deckFilter: any): Observable<Page<Deck>> {
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
        return this.httpClient.get<Deck>(this._configurationService.getApiUrl() + 'decks/' + id)
            .pipe(tap(deck => {
                this.currentDeckChange.next(deck)
            }));
    }

    public create(deck: Deck): Observable<Deck> {
        return this._authService.authState.pipe(switchMap(authUser => {
            const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + authUser?.idToken)
            return this.httpClient.post<Deck>(this._configurationService.getApiUrl() + 'decks', deck,
                {headers: httpHeaders});
        }))

    }

    public delete(id: string): Observable<void> {
        return this._authService.authState.pipe(switchMap(authUser => {
            const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + authUser?.idToken)
            return this.httpClient.delete<void>(this._configurationService.getApiUrl() + 'decks/' + id,
                {headers: httpHeaders});
        }));
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

    public getColorOfDeck(deck: Deck): Color {
        const countColorCards: Map<number, number> = new Map<number, number>();
        deck?.leader?.colors?.forEach(color => {
            DeckService.updateCountColorMap(countColorCards, color?.id);
        })
        deck?.cards?.forEach(card => {
            card?.colors?.forEach(color => {
                DeckService.updateCountColorMap(countColorCards, color?.id)
            })
        });
        let maxColor = 0;
        let maxColorValue = 0;
        countColorCards?.forEach((value, key) => {
            if (value > maxColorValue) {
                maxColor = key;
                maxColorValue = value;
            }
        })
        return {id: maxColor, label: ""};
    }

    private static updateCountColorMap(map: Map<number, number>, colorId: number): void {
        if (map.has(colorId)) {
            map.set(colorId, map.get(colorId) + 1);
        } else {
            map.set(colorId, 1);
        }
    }

}
