export function compareToCard(card: Card, card2: Card): number {
    if (card?.type?.id !== card2?.type?.id) {
        // If the card is a stage, we increase the id of type because we want stages in last
        const idTypeCard = card?.type?.id === 2 ? 4 :  card?.type?.id;
        const idTypeCard2 = card2?.type?.id === 2 ? 4 :  card2.type?.id;
        return idTypeCard - idTypeCard2;
    }
    if (card?.cost !== card2?.cost) {
        return card?.cost - card2?.cost;
    }
    if (card?.power !== card2?.power) {
        return card?.power - card2?.power;
    }
    return card?.counter - card2?.counter;
}
