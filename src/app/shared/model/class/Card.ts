import {Type} from "./Type";
import {Attribute} from "./Attribute";
import {Rarity} from "./Rarity";
import {Tag} from "./Tag";
import {Color} from "./Color";
import {Product} from "./Product";

export class Card {
    id: string;
    type: Type;
    products: Product[];
    colors: Color[];
    tags: Tag[];
    attribute: Attribute;
    label: string;
    effect: string;
    cost: number;
    images: string[];
    power: number;
    life: number;
    counter: number;
    rarity: Rarity;
}
