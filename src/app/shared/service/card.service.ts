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

    public search(cardFilter: any, numberPage: number, numberElements: number): Observable<Page<Card>> {
        let httpParams = new HttpParams()
            .set('page', numberPage)
            .set('size', numberElements);
        httpParams = CardService.addFilterParamsToSearchQuery(cardFilter, httpParams);
        return this.httpClient.get<Page<Card>>(this._configurationService.getApiUrl() + 'cards',
            {params: httpParams});
    }


    private static addFilterParamsToSearchQuery(cardFilter: any, httpParams: HttpParams): HttpParams {
        if (cardFilter?.types?.length) {
            httpParams = httpParams.set('typeId', cardFilter.types.map(type => type?.id).join(","));
        }
        if (cardFilter?.tags?.length) {
            httpParams = httpParams.set('tagId', cardFilter.tags.map(tag => tag?.id).join(","));
        }
        if (cardFilter?.rarities?.length) {
            httpParams = httpParams.set('rarityId', cardFilter.rarities.map(rarity => rarity?.id).join(","));
        }
        if (cardFilter?.colors?.length) {
            httpParams = httpParams.set('colorId', cardFilter.colors.map(color => color?.id).join(","));
        }
        if (cardFilter?.products?.length) {
            httpParams = httpParams.set('productId', cardFilter.products.map(product => product?.id).join(","));
        }
        if (cardFilter?.costs?.length) {
            httpParams = httpParams.set('cost', cardFilter.costs.join(","));
        }
        if (cardFilter?.powers?.length) {
            httpParams = httpParams.set('power', cardFilter.powers.join(","));
        }
        if (cardFilter?.keyword && cardFilter?.keyword !== '') {
            httpParams = httpParams.set('keyword', cardFilter.keyword);
        }

        return httpParams;
    }
}
