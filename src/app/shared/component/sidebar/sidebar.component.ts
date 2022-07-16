import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ROUTES} from "../../../app.routing";
import {LanguageService} from "../../service/language.service";

declare const $: any;


@Component({
    selector: 'opdb-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private _languageService: LanguageService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    }

    changeLanguage(language: string) {
        this._languageService.setLanguage(language);
    }
}
