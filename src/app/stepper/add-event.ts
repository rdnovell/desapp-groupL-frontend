import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../model/item';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddMailComponent, modalAddMailEvent } from '../modals/add-mail';
import { MailModel } from '../model/mail';
import {ModalDelMailComponent , modalDelMailEvent} from '../modals/del-mail';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.html',
  styleUrls: ['./add-event.css']
})

export class ModalAddEventComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  mails: MailModel[] = [{position: 1, email: 'juan@gmail.com'}];
  mailCounter = 1;
  displayedColumnsItems: string[] = ['select', 'id', 'item', 'cost'];
  displayedColumnsMails: string[] = ['position', 'email', 'actions'];

  items: ItemModel[] = [
    {id: 1, item: 'Cerveza', cost: 50},
    {id: 2, item: 'Asado', cost: 100},
    {id: 3, item: 'Pan', cost: 30},
    {id: 4, item: 'Vino', cost: 40},
    {id: 5, item: 'Carbon', cost: 50},
    {id: 6, item: 'Coca cola', cost: 80},
  ];

  eventTypeList: any = [
    {value: '0', viewValue: 'Fiesta'},
    {value: '1', viewValue: 'Canasta'},
    {value: '2', viewValue: 'Vaquita'}
  ];


  dataSourceMails = new MatTableDataSource<MailModel>(this.mails);
  dataSourceItems = new MatTableDataSource<ItemModel>(this.items);
  selection = new SelectionModel<ItemModel>(true, []);

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) {
    modalAddMailEvent.on('addMail', mail => {
      this.mailCounter = this.mailCounter + 1;
      this.mails.push({position: this.mailCounter, email: mail});
      this.updateMails(this.mails);
    });

    modalDelMailEvent.on('delMail', mail => {
      this.mailCounter = this.mailCounter - 1;
      this.mails = this.mails.filter(email => email.position !== mail.position);
      this.updateMails(this.mails);
    });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  private updateMails(mails) {
    this.mails = mails;
    this.dataSourceMails = new MatTableDataSource(mails);

  }

  sendForm() {
    console.log('imprimo los datos de los forms');
    console.log('titulo del evento ' + this.firstFormGroup.value.title);
    console.log('tipo de evento seleccionado ' + this.eventTypeList[this.firstFormGroup.value.type].viewValue + ' codigo ' + this.firstFormGroup.value.type);
    console.log('fecha del evento seleccionada ' + this.firstFormGroup.value.date);
    console.log('items elegidos ' + this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(item => item.item));
    console.log('invitados ' + this.dataSourceMails.data.map(mail => mail.email));
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getTotalMails() {
    return this.dataSourceMails.data.length;
  }
  getTotalCost() {
    return this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  addMail() {
    this.modalService.open(ModalAddMailComponent, { backdrop: 'static', keyboard: false, centered: true });
  }

  delEmail(row: any) {
    const modalRef = this.modalService.open(ModalDelMailComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.mail = row;

  }
}

