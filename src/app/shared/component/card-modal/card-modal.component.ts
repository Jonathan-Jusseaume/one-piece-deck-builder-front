import {Component, Input, OnInit} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'opdb-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

    @Input()
    public card: Card;
    public currentImageIndex: number = 0;

    constructor(private _configurationService: ConfigurationService, private _ngbModalService: NgbModal) {
    }

    ngOnInit(): void {
    }

    changePage(newImageIndex: number): void {
        this.currentImageIndex = newImageIndex;
    }

    getColors(colors: Color[]): string {
        return colors?.map(color => color?.label)?.join(" / ");
    }

    close() {
        this._ngbModalService.dismissAll();
    }

    getEffectStylized(effect: string | undefined) {
        if (!effect) {
            return "-"
        }
        effect = effect.replace('[Activate: Main]',
            '<span class="effect-box effect-main">Activate: Main</span>');
        effect = effect.replace('[Once Per Turn]',
            '<span class="effect-box effect-once">Once Per Turn</span>');
        return effect;
    }
}
