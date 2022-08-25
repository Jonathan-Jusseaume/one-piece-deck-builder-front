import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {TypeEnum} from "../../model/constant/TypeEnum";
import {interval, Subscription} from "rxjs";

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

  public currentImageIndex = 0;

  @Output()
  public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

  private subscriptions: Subscription[] = [];

  TypeEnum = TypeEnum;

  constructor(public _configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.subscriptions.push(interval(3000).subscribe(() => {
      this.currentImageIndex =(this.currentImageIndex + 1) % (this.card.images.length)
    }))
  }

  isClicked(card: Card) {
    this.cardIsClicked.emit(card);
  }

  ngOnDestroy() {
    this.subscriptions?.forEach(sub => sub.unsubscribe());
  }
}
