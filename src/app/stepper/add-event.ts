import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../model/item';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddMailComponent, modalAddMailEvent } from '../modals/add-mail';
import { MailModel } from '../model/mail';
import { ModalDelMailComponent , modalDelMailEvent } from '../modals/del-mail';
import { DataService } from '../service/data.service';

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
  displayedColumnsItems: string[] = ['select', 'title', 'price'];
  displayedColumnsMails: string[] = ['position', 'email', 'actions'];

  items: ItemModel[] = [
    {title: 'Cerveza', price: 50},
    {title: 'Asado', price: 100},
    {title: 'Pan', price: 30},
    {title: 'Vino', price: 40},
    {title: 'Carbon', price: 50},
    {title: 'Coca cola', price: 80},
  ];

  eventTypeList: any = [
    {value: '0', viewValue: 'profile.firstTabContent.stepOne.selectorLabelOne'},
    {value: '1', viewValue: 'profile.firstTabContent.stepOne.selectorLabelTwo'},
    {value: '2', viewValue: 'profile.firstTabContent.stepOne.selectorLabelThree'}
  ];


  dataSourceMails = new MatTableDataSource<MailModel>(this.mails);
  dataSourceItems = new MatTableDataSource<ItemModel>(this.items);
  selection = new SelectionModel<ItemModel>(true, []);

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private dataService: DataService) {
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
    console.log(' codigo ' + this.firstFormGroup.value.type);
    console.log('fecha del evento seleccionada ' + this.firstFormGroup.value.date);
    console.log('items elegidos ' + this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(item => item.title));
    console.log('invitados ' + this.dataSourceMails.data.map(mail => mail.email));
    const data = {
    title: this.firstFormGroup.value.title,
    items: this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(item => item.title),
    invs: this.dataSourceMails.data.map(mail => mail.email),
    date: this.firstFormGroup.value.date,
    expirationDate: this.firstFormGroup.value.date
    };
    switch (this.firstFormGroup.value.type) {
      case '0': {
        console.log('entre al codigo 0');
        this.dataService.createParty(data).subscribe(resp => {console.log('llame al create party'); });
        break;
      }
      case '1': {
        this.dataService.createParty(data);
        break;
      }
      case '2': {
        this.dataService.createParty(data);
        break;
      }
    }
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

  getTotalMails() {
    return this.dataSourceMails.data.length;
  }
  getTotalCost() {
    return this.dataSourceItems.data.filter(t => this.selection.isSelected(t)).map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  addMail() {
    this.modalService.open(ModalAddMailComponent, { backdrop: 'static', keyboard: false, centered: true });
  }

  delEmail(row: any) {
    const modalRef = this.modalService.open(ModalDelMailComponent, { backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.mail = row;

  }
}

