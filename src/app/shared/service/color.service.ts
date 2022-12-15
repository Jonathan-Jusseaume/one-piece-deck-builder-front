import {Injectable} from '@angular/core';
import {ConfigurationService} from "./configuration.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {ColorEnum} from "../model/constant/ColorEnum";

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private _configurationService: ConfigurationService, private _translateService: TranslateService,
                private httpClient: HttpClient, private _languageService: LanguageService) {

    }

    public list(): Observable<Color[]> {
        return this.httpClient.get<Color[]>(this._configurationService.getApiUrl() + 'colors');
    }

    public getCssColorFromCardColor(cardColor: Color): string {
        switch (cardColor?.id) {
            case ColorEnum.RED:
                return '#d6151a';
            case ColorEnum.GREEN:
                return '#00906a';
            case ColorEnum.BLUE:
                return '#0079a9';
            case ColorEnum.PURPLE:
                return '#843180';
            case ColorEnum.BLACK:
                return '#808080';
        }
    }

    public getCssPieChartColorsFromCardColor(cardColor: Color): string[] {
        switch (cardColor?.id) {
            case ColorEnum.RED:
                return ['#FFA07A', '#d6151a', '#ffA500', '#ff6600'];
            case ColorEnum.GREEN:
                return ['#90ee90', '#00906a', '#32CD32', '#00fa9a'];
            case ColorEnum.BLUE:
                return ['#191970', '#0079a9', '#87CEEB', '#40E0D0'];
            case ColorEnum.PURPLE:
                return ['#EE82EE', '#843180', '#FF00FF', '#BA55D3'];
            case ColorEnum.BLACK:
                return ['#808080', '#D3D3D3', '#A9A9A9', '#696969'];
        }
    }

    getCssColorNameFromCardColor(cardColor: Color) {
        switch (cardColor?.id) {
            case ColorEnum.RED:
                return 'red';
            case ColorEnum.GREEN:
                return 'green';
            case ColorEnum.BLUE:
                return 'blue';
            case ColorEnum.PURPLE:
                return 'purple';
            case ColorEnum.BLACK:
                return 'black';
        }
    }
}
