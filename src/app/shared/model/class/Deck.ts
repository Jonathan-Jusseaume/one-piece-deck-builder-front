import {Card} from "./Card";

export class Deck {
    id: string;
    leader: Card;
    cards: Card[];
    name: string;
    description: string;
    creationDate: Date;
}
