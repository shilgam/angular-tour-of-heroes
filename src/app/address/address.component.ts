/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      'address',
      new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
      })
    );
  }

  public get isValid(): boolean {
    return this.parentFormGroup.controls.address.valid;
  }

  public get isDirty(): boolean {
    return this.parentFormGroup.controls.address.dirty;
  }
}
