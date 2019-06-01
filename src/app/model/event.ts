import { ItemModel } from './item';

export class EventModel {
    id: number;
    title: string;
    items: ItemModel[];
    invs: ItemModel[];
    date: string;
    expirationDate: string;
}
