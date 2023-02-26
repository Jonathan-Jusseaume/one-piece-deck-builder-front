import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {InterfaceService} from "../../service/interface.service";
import {ROUTES} from "../../../app.routing";
import {LanguageService} from "../../service/language.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SocialUser} from "@abacritt/angularx-social-login";


declare const $: any;

@Component({
    selector: 'opdb-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    private toggleButton: any;
    private sidebarVisible: boolean;
    public user: SocialUser;
    public isDarkMode: boolean = true;

    @ViewChild('googleButton', {static: false}) googleButton: ElementRef;

    @Input() sidebarOpened: boolean;
    @Output() clickMenuButton: EventEmitter<void> = new EventEmitter<void>();

    constructor(private location: Location, private element: ElementRef, private _languageService: LanguageService,
                private _interfaceService: InterfaceService, private _socialAuthService: SocialAuthService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('light')) {
            this.changeMode();
        }
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this._socialAuthService.authState.subscribe(user => {
            this.user = user;
        })
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


    logOut() {
        this._socialAuthService.signOut();
    }

    isMobileMenu(): boolean {
        return $(window).width() <= 991;
    }

    changeMode(): void {
        this.isDarkMode = !this.isDarkMode;
        if (!this.isDarkMode) {
            document.getElementById('body').classList.add('light');
            sessionStorage.setItem('light', 'true');
        } else {
            document.getElementById('body').classList.remove('light');
            sessionStorage.removeItem('light');
        }

    }

    clickMenu(): void {
        this.clickMenuButton.emit();
    }
}
