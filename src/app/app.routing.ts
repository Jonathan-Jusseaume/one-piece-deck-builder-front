import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./pages/user/user.component";
import {TablesComponent} from "./pages/tables/tables.component";
import {TypographyComponent} from "./pages/typography/typography.component";
import {MapsComponent} from "./pages/maps/maps.component";
import {NotificationsComponent} from "./pages/notifications/notifications.component";
import {UpgradeComponent} from "./pages/upgrade/upgrade.component";
import {IconsComponent} from "./pages/icons/icons.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SearchComponent} from "./pages/search/search.component";

export const ROUTES: RouteInfo[] = [
    {
        path: '/search',
        title: 'Search',
        icon: 'fa fa-search',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    },
    {
        path: '/user',
        title: 'User Profile',
        icon: 'pe-7s-user',
        class: '',
        color: 'green',
        backgroundImage: 'assets/img/zoro.jpg'
    },
    {
        path: '/table',
        title: 'Table List',
        icon: 'pe-7s-note2',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    },
    {
        path: '/typography',
        title: 'Typography',
        icon: 'pe-7s-news-paper',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    },
    {
        path: '/icons',
        title: 'Icons',
        icon: 'pe-7s-science',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    },
    {
        path: '/maps',
        title: 'Maps',
        icon: 'pe-7s-map-marker',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    },
    {
        path: '/notifications',
        title: 'Notifications',
        icon: 'pe-7s-bell',
        class: '',
        color: 'red',
        backgroundImage: 'assets/img/luffy.jpg'
    }
];

export const routes: Routes = [
    {path: 'search', component: SearchComponent},
    {path: 'user', component: UserComponent},
    {path: 'table', component: TablesComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: '**', redirectTo: 'search'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
