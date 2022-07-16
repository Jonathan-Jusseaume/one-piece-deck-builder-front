import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    private readonly apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:8080/api/'
    }

    public getApiUrl(): string {
        return this.apiUrl;
    }
}
