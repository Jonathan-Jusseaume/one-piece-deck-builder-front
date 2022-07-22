import {ANIMATION_MODULE_TYPE, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NavbarComponent} from "./shared/component/navbar/navbar.component";
import {SidebarComponent} from "./shared/component/sidebar/sidebar.component";
import {FooterComponent} from "./shared/component/footer/footer.component";
import {MapsComponent} from "./pages/maps/maps.component";
import {NguiMapModule} from "@ngui/map";
import {IconsComponent} from "./pages/icons/icons.component";
import {SearchComponent} from "./pages/search/search.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {CardResultsComponent} from './shared/component/card-results/card-results.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CardComponent} from './shared/component/card/card.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import {DeckBuilderComponent} from "./pages/deck-builder/deck-builder.component";
import {SearchFilterComponent} from './shared/component/search-filter/search-filter.component';
import {DeckVisualisationComponent} from './shared/component/deck-visualisation/deck-visualisation.component';
import {MatTabsModule} from "@angular/material/tabs";
import {DeckStatistiquesComponent} from './shared/component/deck-statistiques/deck-statistiques.component';
import {BrowserModule} from "@angular/platform-browser";
import {NgxTabsModule} from "@ngx-lite/tabs";
import { DeckCostBarChartComponent } from './shared/component/deck-cost-bar-chart/deck-cost-bar-chart.component';
import {BarChartModule} from "@swimlane/ngx-charts";

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NguiMapModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SocialLoginModule,
        MatTabsModule,
        BrowserModule,
        NgxTabsModule,
        BarChartModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        MapsComponent,
        IconsComponent,
        SearchComponent,
        CardResultsComponent,
        CardComponent,
        DeckBuilderComponent,
        SearchFilterComponent,
        DeckVisualisationComponent,
        DeckStatistiquesComponent,
        DeckCostBarChartComponent
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true, //keeps the user signed in
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider('992619369309-dbtcsa095jkkp7ht504i8pvt8snj8f1o.apps.googleusercontent.com') // your client id
                }
            ],
            onError: (err) => {
                console.error(err);
            }
        } as SocialAuthServiceConfig
    },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
