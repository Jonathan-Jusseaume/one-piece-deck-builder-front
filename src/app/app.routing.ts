import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./pages/search/search.component";
import {DeckBuilderComponent} from "./pages/deck-builder/deck-builder.component";
import {RouteGuard} from "./route.guard";
import {MyDecksComponent} from "./pages/my-decks/my-decks.component";
import {DeckDetailsComponent} from "./pages/deck-details/deck-details.component";
import {DecksSearchComponent} from "./pages/decks-search/decks-search.component";

export const ROUTES: RouteInfo[] = [
    {
        path: '/search',
        title: 'Search',
        icon: 'fa fa-search',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg',
        connected: false,
        visible: true
    },
    {
        path: '/deck-builder',
        title: 'DeckBuilder',
        icon: 'pe-7s-hammer',
        class: '',
        color: 'green',
        backgroundImage: 'assets/img/zoro.jpg',
        connected: false,
        visible: true
    },
    {
        path: '/decks',
        title: 'DeckSearch',
        icon: 'pe-7s-filter',
        class: '',
        color: 'purple',
        backgroundImage: 'assets/img/roger.jpg',
        connected: false,
        visible: true
    },
    {
        path: '/my-decks',
        title: 'YourDeck',
        icon: 'pe-7s-albums',
        class: '',
        color: 'blue',
        backgroundImage: 'assets/img/ace.jpg',
        connected: true,
        visible: true
    },
    {
        path: '/decks/',
        title: 'DeckDetails',
        icon: '',
        class: '',
        color: 'purple',
        backgroundImage: 'assets/img/roger.jpg',
        connected: false,
        visible: false
    }
];

export const routes: Routes = [
    {path: 'search', component: SearchComponent},
    {path: 'deck-builder', component: DeckBuilderComponent},
    {path: 'my-decks', component: MyDecksComponent, canActivate: [RouteGuard]},
    {path: 'decks', component: DecksSearchComponent},
    {path: 'decks/:id', component: DeckDetailsComponent},
    {path: '**', redirectTo: 'search'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
