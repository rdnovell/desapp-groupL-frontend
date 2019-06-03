import { Component, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../service/data.service';

const modalDelMailEvent = new EventEmitter();
const modalChangeEventDelEmail = new EventEmitter();

@Component({
    selector: 'app-del-mail',
    templateUrl: './del-mail.html',
    styleUrls: ['./del-mail.css']
})

class ModalDelMailComponent {
    @Input() public mail;
    @Input() public eventId;
    @Input() public eventGuest;

    constructor(public modalService: NgbModal, private dataService: DataService) {}

    handleSubmit() {
        if (this.eventId) {
            const data = {eventId: this.eventId, userEmails: this.eventGuest.filter(e => e !== this.mail)};
            this.dataService.updateGuestToEvent(data).subscribe(resp => {
                modalChangeEventDelEmail.emit('changeEvents');
            });
        } else {
            modalDelMailEvent.emit('delMail', this.mail);
        }

        this.modalService.dismissAll('close');
    }
}

export { ModalDelMailComponent, modalDelMailEvent, modalChangeEventDelEmail };
