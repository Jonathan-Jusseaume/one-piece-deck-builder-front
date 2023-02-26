import {Component, OnInit} from '@angular/core';
import {ROUTES} from "../../../app.routing";
import {LanguageService} from "../../service/language.service";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

declare const $: any;


@Component({
    selector: 'opdb-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    public user: SocialUser;
    public languageModeOpened: boolean = false;

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
        this.languageModeOpened = false;
    }

    logOut() {
        this._socialAuthService.signOut();
    }

    switchLanguageMode(): void {
        this.languageModeOpened = !this.languageModeOpened;
    }
}
