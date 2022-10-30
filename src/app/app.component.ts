import {Component, HostListener, OnInit} from '@angular/core';
import {Location, PopStateEvent} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {filter, Subscription} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {InterfaceService} from "./shared/service/interface.service";
import PerfectScrollbar from "perfect-scrollbar";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {LanguageService} from "./shared/service/language.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public sidebarOpened: boolean = true;
    public clickedOnceOnRetract: boolean = false;

    public colorMap: Map<string, string> = new Map<string, string>([
        ['purple', '#9368E9'],
        ['red', '#FB404B'],
        ['green', '#87CB16'],
        ['orange', '#FFA534'],
        ['blue', '#1F77D0'],
        ['black', '5e5e5e']
    ])

    constructor(public location: Location, private _translateService: TranslateService,
                private router: Router, private _interfaceService: InterfaceService,
                private _authService: SocialAuthService, private _languageService: LanguageService) {
        const languagesAvailable = ['en', 'fr'];
        this._translateService.addLangs(languagesAvailable);
        if (sessionStorage.getItem('lang')) {
            this._translateService.use(sessionStorage.getItem('lang'));
            this._languageService.setLanguage(sessionStorage.getItem('lang'));
        } else {
            if (languagesAvailable.some(language => language === navigator.language)) {
                this._translateService.use(navigator.language);
                this._languageService.setLanguage(navigator.language);
            } else {
                this._translateService.use('en');
                this._languageService.setLanguage('en');
            }
        }
    }

    ngOnInit() {
        this.sidebarOpened = window.innerWidth > 960;
        this._authService.authState.subscribe((user) => {
            console.log(user)
        });
        const isWindows = navigator.platform.indexOf('Win') > -1;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (elemMainPanel) {
                elemMainPanel.scrollTop = 0;
            }
            if (elemSidebar) {
                elemSidebar.scrollTop = 0;
            }
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }
    }

    ngAfterViewInit() {
        this.runOnRouteChange();
    }

    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    getColor() {
        return this._interfaceService.getCurrentRouteInfo()?.color || 'red';
    }

    getBackground() {
        return this._interfaceService.getCurrentRouteInfo()?.backgroundImage || 'assets/img/luffy.jpg';
    }

    switchSideBarMode(): void {
        this.clickedOnceOnRetract = true;
        this.sidebarOpened = !this.sidebarOpened;
    }

    getHexaColorByName(name: string): string {
        return this.colorMap.get(name);
    }

    @HostListener('window:resize', ['$event.target'])
    public onResize(target) {
        if (!this.clickedOnceOnRetract) {
            if (target.innerWidth <= 961) {
                this.sidebarOpened = false;
            }
        }

    }

    isMobileMenu() {
        return window.innerWidth <= 991;
    }
}
