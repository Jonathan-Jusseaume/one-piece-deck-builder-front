import {Card} from "../class/Card";
import {Deck} from "../class/Deck";

export function getDistinctCardsFromDeck(deck: Deck) {
    const alreadySeenCards: Map<string, boolean> = new Map<string, boolean>();
    const distinctCards: Card[] = [];
    deck?.cards.forEach(card => {
        if (!alreadySeenCards.get(card.id)) {
            distinctCards.push(card);
            alreadySeenCards.set(card.id, true);
        }
    });
    return distinctCards;
}
