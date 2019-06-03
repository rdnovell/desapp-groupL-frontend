import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel} from '../model/item';
import { MatTableDataSource } from '@angular/material';
import { ModalAddItemComponent, modalAddItemToEvent } from './add-item';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from '../service/data.service';
import { modalChangeEvent } from '../stepper/add-event';

@Component({
    selector: 'app-event-items',
    templateUrl: './event-items.html',
    styleUrls: ['./event-items.css']
})

export class ModalEventItemsComponent implements OnInit {

    @Input() public items;
    @Input() public id;

    displayedColumnsItems: string[] = ['select', 'title', 'price', 'actions'];
    dataSourceItems = new MatTableDataSource<ItemModel>(this.items);
    selection = new SelectionModel<ItemModel>(true, []);

    constructor(public modalService: NgbModal, private dataService: DataService) {

        modalAddItemToEvent.on('addItemToEvent', data => {
            this.items.push(data.item);
            this.dataSourceItems.data = this.items;
            const eventItemData = {eventId: this.id, itemsTitle: this.items.map(i => i.title)};
            this.dataService.updateItemsToEvent(eventItemData).subscribe(resp => {});
        });

    }

    ngOnInit() {
        console.log(this.items);
        this.dataService.getItems().subscribe(resp => {
            this.dataSourceItems.data = resp;
            this.dataSourceItems.data.forEach(row => {
                if (this.items.some(i => i.title === row.title)) { this.selection.select(row); }
            });
        });

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSourceItems.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSourceItems.data.forEach(row => this.selection.select(row));
    }

    checkboxLabel(row?: ItemModel): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title}`;
    }

    getTotalCost() {
        return this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(t => t.price).reduce((acc, value) => acc + value, 0);
    }

    addItem() {
        const modalRef = this.modalService.open(ModalAddItemComponent, { backdrop: 'static', keyboard: false, centered: true });
        modalRef.componentInstance.event = this.id;
    }

    updateItems() {
        const itemsTitle = this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(i => i.title);
        const eventItemData = {eventId: this.id, itemsTitle};
        this.dataService.updateItemsToEvent(eventItemData).subscribe(resp => {
            modalChangeEvent.emit('changeEvents');
        });
        this.modalService.dismissAll('close');

    }
}
