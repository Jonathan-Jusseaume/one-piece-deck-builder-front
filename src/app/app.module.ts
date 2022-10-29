import {ANIMATION_MODULE_TYPE, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import {DeckCostBarChartComponent} from './shared/component/deck-cost-bar-chart/deck-cost-bar-chart.component';
import {BarChartModule, PieChartModule} from "@swimlane/ngx-charts";
import {DeckTypePieChartComponent} from './shared/component/deck-type-pie-chart/deck-type-pie-chart.component';
import {DeckPowerBarChartComponent} from "./shared/component/deck-power-bar-chart/deck-power-bar-chart.component";
import {HandShufflerComponent} from './shared/component/hand-shuffler/hand-shuffler.component';
import {HttpAcceptLanguageInterceptor} from "./shared/service/http-accept-language-interceptor.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { SaveDeckComponent } from './shared/component/save-deck/save-deck.component';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from "ngx-markdown";
import { MyDecksComponent } from './pages/my-decks/my-decks.component';
import { DeckPreviewComponent } from './shared/component/deck-preview/deck-preview.component';
import {DatePipe} from "@angular/common";

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.link = (href: string, title: string, text: string) => {
        return `${text}`;
    };

    return {
        renderer: renderer
    };
}

@NgModule({
    imports: [
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptionsFactory,
            },
        }),
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MarkdownModule.forRoot(),
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
        BarChartModule,
        PieChartModule
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
        DeckCostBarChartComponent,
        DeckTypePieChartComponent,
        DeckPowerBarChartComponent,
        HandShufflerComponent,
        SaveDeckComponent,
        MyDecksComponent,
        DeckPreviewComponent
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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAcceptLanguageInterceptor,
            multi: true,
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
