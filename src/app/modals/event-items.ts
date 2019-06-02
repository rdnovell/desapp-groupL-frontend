import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel} from '../model/item';
import { MatTableDataSource } from '@angular/material';
import { ModalAddItemComponent, modalAddItemToEvent } from './add-item';

@Component({
    selector: 'app-event-items',
    templateUrl: './event-items.html',
    styleUrls: ['./event-items.css']
})

export class ModalEventItemsComponent implements OnInit {

    @Input() public items;
    @Input() public id;

    displayedColumnsItems: string[] = ['title', 'price', 'actions'];
    dataSourceItems = new MatTableDataSource<ItemModel>(this.items);

    constructor(public modalService: NgbModal) {

        modalAddItemToEvent.on('addItemToEvent', data => {
            console.log('llamo al event emitter para el caso que se agrego un item para un evento ');
            console.log(this.items);
            this.items.push(data.item);
            console.log(this.items);
            this.dataSourceItems.data = this.items;
            console.log('esto lo hago para el evento ' + data.id);
            console.log('esto lo hago para el evento ' + data.item);
            // falta llamar a la API y agregar el item o pisarlos
        });

    }

    ngOnInit() {
        console.log(this.items);
        this.dataSourceItems.data = this.items;

    }

    delItem(row: any) {
        console.log('Entro al borrar un item');
        this.items = this.items.filter(item => item.title !== row.title);
        console.log(this.items);
        this.dataSourceItems.data = this.items;
        // falta borrarlo posta de la API
    }

    addItem() {
        console.log('Voy a agregar el item entonces llamo al modal');
        console.log(this.id);
        const modalRef = this.modalService.open(ModalAddItemComponent, { backdrop: 'static', keyboard: false, centered: true });
        modalRef.componentInstance.event = this.id;
    }
}
