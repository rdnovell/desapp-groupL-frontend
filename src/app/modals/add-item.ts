import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import {DataService} from '../service/data.service';

const modalAddItem = new EventEmitter();

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.html',
    styleUrls: ['./add-item.css']
})

class ModalAddItemComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public modalService: NgbModal, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            price: ['', Validators.required]
        });
    }

    handleSubmit() {
        console.log('entre al crear item');
        console.log(this.registerForm.controls.title.value);
        console.log(this.registerForm.controls.price.value);
        const item = {title: this.registerForm.controls.title.value, price: this.registerForm.controls.price.value};
        this.dataService.crearItem(item).subscribe(resp => {
            modalAddItem.emit('addItem');
        });
        this.modalService.dismissAll('close');
    }

    getTitleErrorMessage() {
        return this.registerForm.controls.title.errors.required ? 'Debe ingresar un titulo.' : 'El titulo ingresado es incorrecto.';
    }
    getPriceErrorMessage() {
        return this.registerForm.controls.price.errors.required ? 'Debe ingresar un precio.' : 'El precio ingresado es incorrecto.';
    }
}

export { ModalAddItemComponent, modalAddItem };
