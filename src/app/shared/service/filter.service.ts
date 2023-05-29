import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    constructor() {
    }

    private formFilter: any;

    public formFilterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    setFilter(formFilter: any) {
        this.formFilter = formFilter;
        this.formFilterSubject.next(formFilter);
    }
}
