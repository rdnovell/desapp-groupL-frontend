import { ItemModel } from './item';

export class EventModel {
    type: string;
    title: string;
    owner: string;
    items: ItemModel[];
    invs: ItemModel[];
    date: string;
    expirationDate: string;
}
