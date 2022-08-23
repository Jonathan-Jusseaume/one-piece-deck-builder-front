declare interface Card {
    id: string;
    type: Type;
    product: Product;
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
