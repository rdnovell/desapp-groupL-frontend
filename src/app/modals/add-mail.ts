import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { DataService } from '../service/data.service';

const modalAddMailEvent = new EventEmitter();
const modalChangeEventEmail = new EventEmitter();

@Component({
    selector: 'app-add-mail',
    templateUrl: './add-mail.html',
    styleUrls: ['./add-mail.css']
})

class ModalAddMailComponent implements OnInit {

    @Input() public eventId;
    @Input() public eventGuest;
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public modalService: NgbModal, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    handleSubmit() {
        if (this.eventId) {
            this.eventGuest.push(this.registerForm.controls.email.value);
            const data = {eventId: this.eventId, userEmails: this.eventGuest};
            this.dataService.updateGuestToEvent(data).subscribe(resp => {
                modalChangeEventEmail.emit('changeEvents');
            });
        } else {
            modalAddMailEvent.emit('addMail', this.registerForm.controls.email.value);
        }
        this.modalService.dismissAll('close');
    }

    getEmailErrorMessage() {
        return this.registerForm.controls.email.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es incorrecto.';
    }
}

export { ModalAddMailComponent, modalAddMailEvent, modalChangeEventEmail };
