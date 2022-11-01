import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    private readonly apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl;
    }

    public getApiUrl(): string {
        return this.apiUrl;
    }
}
