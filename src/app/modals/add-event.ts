import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  eventTypeList: any = [
    {value: '0', viewValue: 'Fiesta'},
    {value: '1', viewValue: 'Canasta'},
    {value: '2', viewValue: 'Vaquita'}
  ];

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
}

