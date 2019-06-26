import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { DataService } from '../../service/data.service';
import { formGroup, getValues, hasError } from '../../model/validationForm';

const modalAddItem = new EventEmitter();
const modalAddItemToEvent = new EventEmitter();

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.html',
    styleUrls: ['./add-item.css']
})

class ModalAddItemComponent implements OnInit {

    @Input() public event;

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public modalService: NgbModal, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.registerForm = formGroup(this.formBuilder, 'title', 'price');
    }

    numbersOnly({ which, keyCode}): boolean {
        const charCode = which || keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    }

    handleSubmit() {
        const item: any = getValues(this.registerForm);
        this.dataService.crearItem(item).subscribe(resp => {
           modalAddItem.emit('addItem', item);
           if (this.event) {
                modalAddItemToEvent.emit('addItemToEvent', {id: this.event, item});
            }
        });
        this.modalService.dismissAll('close');
    }

    formHasError(field) {
        return hasError(this.registerForm, field);
    }

    titleHasError() {
        return this.formHasError('title');
    }

    priceHasError() {
        return this.formHasError('price');
    }

}

export { ModalAddItemComponent, modalAddItem , modalAddItemToEvent};
