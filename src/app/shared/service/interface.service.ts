import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {ROUTES} from "../../app.routing";
import {RouteInfo} from "../model/class/RouteInfo";

@Injectable({
    providedIn: 'root'
})
export class InterfaceService {

    constructor(private location: Location) {
    }

    public getCurrentRouteInfo(): RouteInfo {
        let currentPath = this.location.prepareExternalUrl(this.location.path());
        if (currentPath.charAt(0) === '#') {
            currentPath = currentPath.slice(1);
        }
        currentPath = currentPath.split("?")[0];

        let routeInfo: RouteInfo = null;
        ROUTES.forEach(route => {
            if (currentPath.startsWith(route.path)) {
                routeInfo = route;
            }
        })
        return routeInfo;
    }
}
