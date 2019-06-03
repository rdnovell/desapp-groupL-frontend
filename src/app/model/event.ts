import { ItemModel } from './item';

export class EventModel {
    id: number;
    type: string;
    title: string;
    owner: string;
    items: ItemModel[];
    guests: string[];
    date: string;
    expirationDate: string;
}
