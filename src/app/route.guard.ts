import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private _authService: SocialAuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authService.authState.pipe(map(user => user !== null
            || this.router.parseUrl("/search")));
    }

}
