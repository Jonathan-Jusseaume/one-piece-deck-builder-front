import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";
import {TypeEnum} from "../../model/constant/TypeEnum";

@Component({
  selector: 'opdb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public inDeck: boolean = false;

  @Input()
  public countInDeck: number = 0;

  @Output()
  public cardIsClicked: EventEmitter<Card> = new EventEmitter<Card>();

  TypeEnum = TypeEnum;

  constructor(public _configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }

  isClicked(card: Card) {
    this.cardIsClicked.emit(card);
  }
}
