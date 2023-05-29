import {Type} from "./Type";
import {Attribute} from "./Attribute";
import {Tag} from "./Tag";
import {Color} from "./Color";
import {CardImage} from "./CardImage";

export class Card {
    id: string;
    type: Type;
    colors: Color[];
    tags: Tag[];
    attribute: Attribute;
    label: string;
    effect: string;
    cost: number;
    images: CardImage[];
    power: number;
    life: number;
    counter: number;
}
