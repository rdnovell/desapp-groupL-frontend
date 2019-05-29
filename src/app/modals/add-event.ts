import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../model/item';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';


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
  displayedColumns: string[] = ['select', 'position', 'item', 'cost'];

  items: ItemModel[] = [
    {position: 1, item: 'Cerveza', cost: 50},
    {position: 2, item: 'Asado', cost: 100},
    {position: 3, item: 'Pan', cost: 30},
    {position: 4, item: 'Vino', cost: 40},
    {position: 5, item: 'Carbon', cost: 50},
    {position: 6, item: 'Coca cola', cost: 80},
  ];

  eventTypeList: any = [
    {value: '0', viewValue: 'Fiesta'},
    {value: '1', viewValue: 'Canasta'},
    {value: '2', viewValue: 'Vaquita'}
  ];

  dataSource = new MatTableDataSource<ItemModel>(this.items);
  selection = new SelectionModel<ItemModel>(true, []);

  constructor(private formBuilder: FormBuilder) {}

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

  sendForm() {
    console.log('imprimo los datos de los forms');
    console.log(this.firstFormGroup.value.title);
    console.log(this.eventTypeList[this.firstFormGroup.value.type].viewValue);
    console.log(this.firstFormGroup.value.date);
    console.log(this.secondFormGroup.value.secondCtrl);
    console.log(this.thirdFormGroup.value.thirdCtrl);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ItemModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getTotalCost() {
    return this.dataSource.data.filter(t => this.selection.isSelected(t)).map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}

