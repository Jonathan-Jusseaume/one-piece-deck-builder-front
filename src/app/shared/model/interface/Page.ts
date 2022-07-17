declare interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {};
    size: number;
    totalElements: number;
    totalPages: number;
    sort: {};
}
