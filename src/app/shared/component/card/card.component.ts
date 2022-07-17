import {Component, Input, OnInit} from '@angular/core';
import {ConfigurationService} from "../../service/configuration.service";

@Component({
  selector: 'opdb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  constructor(public _configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }

}
