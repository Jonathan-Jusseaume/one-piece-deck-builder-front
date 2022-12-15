import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {TypeEnum} from "../../model/constant/TypeEnum";
import {interval, Subscription} from "rxjs";
import {ColorService} from "../../service/color.service";

@Component({
    selector: 'opdb-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

    @Input()
    public card: Card;

    @Input()
    public inDeck: boolean = false;

    @Input()
    public countInDeck: number = 0;

    @Input()
    public enableEye: boolean = false;

    @Output()
    public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    @Output()
    public cardEyeIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

    public currentImageIndex = 0;

    public TypeEnum = TypeEnum;

    private subscriptions: Subscription[] = [];

    public movementTest = '';

    constructor(public _configurationService: ConfigurationService, public _colorService: ColorService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(interval(3000).subscribe(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % (this.card.images.length)
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

    isClicked(card: Card): void {
        this.cardIsClicked.emit(card);
    }


    eyeClick(card: Card): void {
        this.cardEyeIsClicked.emit(card);
    }

    cardAnimation($event: MouseEvent): void {
        // normalise touch/mouse
        let pos = [$event.offsetX, $event.offsetY];
        $event.preventDefault();
        /*
        if ($event.type === "touchmove") {
            pos = [$event.touches[0].clientX, $event.touches[0].clientY];
        }
        */
        const cardImage = document.getElementById(this.card?.id);
        console.log(cardImage);
        // math for mouse position
        const l = pos[0];
        const t = pos[1];
        const h = (cardImage as HTMLImageElement).height;
        const w = (cardImage as HTMLImageElement).width;
        const px = Math.abs(Math.floor(100 / w * l) - 100);
        const py = Math.abs(Math.floor(100 / h * t) - 100);
        const pa = (50 - px) + (50 - py);
        const lp = (50 + (px - 50) / 1.5);
        const tp = (50 + (py - 50) / 1.5);
        const px_spark = (50 + (px - 50) / 7);
        const py_spark = (50 + (py - 50) / 7);
        const p_opc = 20 + (Math.abs(pa) * 1.5);
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * .5;
        // css to apply for active card
        const grad_pos = `background-position: ${lp}% ${tp}%;`
        const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
        const opc = `opacity: ${p_opc / 100};`
        this.movementTest = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
        // need to use a <style> tag for psuedo elements
        const style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `


    }

    cardAnimationEnd($event: MouseEvent) {
        this.movementTest = '';
    }
}
