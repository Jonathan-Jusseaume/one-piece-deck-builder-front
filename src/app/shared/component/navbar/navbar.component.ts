import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {InterfaceService} from "../../service/interface.service";
import {ROUTES} from "../../../app.routing";
import {LanguageService} from "../../service/language.service";

@Component({
    selector: 'opdb-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(private location: Location, private element: ElementRef, private _languageService: LanguageService,
                private _interfaceService: InterfaceService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        const currentRouteInfo = this._interfaceService.getCurrentRouteInfo();
        return currentRouteInfo?.title || 'Dashboard';
    }

    changeLanguage(language: string) {
        this._languageService.setLanguage(language);
    }
}
