import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'opdb-hand-shuffler',
  templateUrl: './hand-shuffler.component.html',
  styleUrls: ['./hand-shuffler.component.scss']
})
export class HandShufflerComponent implements OnInit {

  @Input()
  public deck: Deck;

  constructor() { }

  ngOnInit(): void {
  }

}
