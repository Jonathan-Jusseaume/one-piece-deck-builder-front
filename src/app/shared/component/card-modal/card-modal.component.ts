import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'opdb-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

    @Input()
    public cardList: Card[];
    @Input()
    public indexInCardList: number;

    public currentImageIndex: number = 0;

    constructor(public _configurationService: ConfigurationService, private _ngbModalService: NgbModal) {
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
        effect = effect.replace('\n',
            '<br> <br>');
        effect = effect.replace('\\n',
            '<br> <br>');
        effect = effect.replace('<Strike>',
            'Strike');
        effect = effect.replace('[Activate: Main]',
            '<span class="effect-box effect-main">Activate: Main</span>');
        effect = effect.replace('[Main]',
            '<span class="effect-box effect-main">Main</span>');
        effect = effect.replace('[When Attacking]',
            '<span class="effect-box effect-main">When Attacking</span>');
        effect = effect.replace('[Your Turn]',
            '<span class="effect-box effect-main">Your Turn</span>');
        effect = effect.replace('[On Block]',
            '<span class="effect-box effect-main">On Block</span>');
        effect = effect.replace('[On Play]',
            '<span class="effect-box effect-main">On Play</span>');
        effect = effect.replace('[Once Per Turn]',
            '<span class="effect-box effect-once">Once Per Turn</span>');
        effect = effect.replace('[DON!! x1]',
            '<span class="effect-box effect-don">DON!! x1</span>');
        effect = effect.replace('[DON!! x2]',
            '<span class="effect-box effect-don">DON!! x2</span>');
        effect = effect.replace('[Blocker]',
            '<span class="effect-box effect-blocker">Blocker</span>');
        effect = effect.replace('[Rush]',
            '<span class="effect-box effect-blocker">Rush</span>');
        effect = effect.replace('[Counter]',
            '<span class="effect-box effect-counter">Counter</span>');
        effect = effect.replace('[Trigger]',
            '<span class="effect-box effect-trigger">Trigger</span>');
        return effect;
    }

    incrementIndex(number: number) {
        let indexTemp = this.indexInCardList;
        indexTemp = indexTemp + number;
        if (indexTemp < 0) {
            indexTemp = this.cardList.length - 1;
        }
        if (indexTemp >= this.cardList.length) {
            indexTemp = 0;
        }
        this.currentImageIndex = 0;
        this.indexInCardList = indexTemp;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === 'ArrowRight' || event.code === 'KeyD') {
            this.incrementIndex(1);
        }
        if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
            this.incrementIndex(-1);
        }
    }
}
