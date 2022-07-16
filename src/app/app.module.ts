import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {IconsComponent} from "./pages/icons/icons.component";
import {LbdChartComponent} from "./pages/lbd/lbd-chart/lbd-chart.component";
import {SearchComponent} from "./pages/search/search.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

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
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        MapsComponent,
        DashboardComponent,
        IconsComponent,
        LbdChartComponent,
        SearchComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
