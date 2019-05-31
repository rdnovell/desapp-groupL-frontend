import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';

const modalAddMailEvent = new EventEmitter();

@Component({
    selector: 'app-add-mail',
    templateUrl: './add-mail.html',
    styleUrls: ['./add-mail.css']
})

class ModalAddMailComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    handleSubmit() {
        modalAddMailEvent.emit('addMail', this.registerForm.controls.email.value);
        this.modalService.dismissAll('close');
    }

    getEmailErrorMessage() {
        return this.registerForm.controls.email.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es incorrecto.';
    }
}

export { ModalAddMailComponent, modalAddMailEvent };
