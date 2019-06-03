import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel} from '../model/item';
import { MatTableDataSource } from '@angular/material';
import { ModalAddMailComponent } from './add-mail';
import { ModalDelMailComponent } from './del-mail';

@Component({
    selector: 'app-event-guest',
    templateUrl: './event-guest.html',
    styleUrls: ['./event-guest.css']
})

export class ModalEventGuestComponent implements OnInit {

    @Input() public guests;
    @Input() public id;

    displayedColumnsGuests: string[] = ['email', 'actions'];
    dataSourceGuests = new MatTableDataSource<ItemModel>(this.guests);

    constructor(public modalService: NgbModal) {
    }

    ngOnInit() {
        console.log(this.guests);
        this.dataSourceGuests.data = this.guests;
    }

    delEmail(row: any) {
        const modalRef = this.modalService.open(ModalDelMailComponent, { backdrop: 'static', keyboard: false, centered: true });
        modalRef.componentInstance.mail = row;
        modalRef.componentInstance.eventId = this.id;
        modalRef.componentInstance.eventGuest = this.guests;
    }

    addMail() {
        const modalRef = this.modalService.open(ModalAddMailComponent, { backdrop: 'static', keyboard: false, centered: true });
        modalRef.componentInstance.eventId = this.id;
        modalRef.componentInstance.eventGuest = this.guests;
    }
}
