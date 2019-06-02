import { ItemModel } from './item';

export class EventModel {
    id: number;
    type: string;
    title: string;
    owner: string;
    items: ItemModel[];
    invs: ItemModel[];
    date: string;
    expirationDate: string;
}
