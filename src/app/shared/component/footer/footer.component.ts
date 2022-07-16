import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'opdb-footer',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    test : Date = new Date();
}
