import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ROUTES} from "../../../app.routing";
import {LanguageService} from "../../service/language.service";
import {SocialUser} from "angularx-social-login";
import {SocialAuthService} from "@abacritt/angularx-social-login";

declare const $: any;


@Component({
    selector: 'opdb-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    public user: SocialUser;


    constructor(private _languageService: LanguageService, private _socialAuthService: SocialAuthService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this._socialAuthService.authState.subscribe(user => {
            this.user = user;
        })
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    }

    changeLanguage(language: string) {
        this._languageService.setLanguage(language);
    }

    logOut() {
        this._socialAuthService.signOut();
    }
}
