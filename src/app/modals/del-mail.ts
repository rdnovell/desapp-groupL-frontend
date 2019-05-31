import { Component, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const modalDelMailEvent = new EventEmitter();

@Component({
    selector: 'app-del-mail',
    templateUrl: './del-mail.html',
    styleUrls: ['./del-mail.css']
})

class ModalDelMailComponent {
    @Input() public mail;

    constructor(public modalService: NgbModal) {}

    handleSubmit() {
        modalDelMailEvent.emit('delMail', this.mail);
        this.modalService.dismissAll('close');
    }
}

export { ModalDelMailComponent, modalDelMailEvent };
