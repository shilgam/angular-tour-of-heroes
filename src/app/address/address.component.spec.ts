/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TestHostComponent, AddressComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    component.profileForm.patchValue({
      address: {
        street: '123 Drew Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '90290'
      }
    });

    const compiled = fixture.debugElement.nativeElement;
    const streetInput = compiled.querySelector('input[formcontrolname="street"]');
    const cityInput = compiled.querySelector('input[formcontrolname="city"]');
    const stateInput = compiled.querySelector('input[formcontrolname="state"]');
    const zipInput = compiled.querySelector('input[formcontrolname="zip"]');

    fixture.detectChanges();

    expect(streetInput.value).toEqual('123 Drew Street');
    expect(cityInput.value).toEqual('San Francisco');
    expect(stateInput.value).toEqual('CA');
    expect(zipInput.value).toEqual('90290');
  });

  it('should set proper validity state of address and display in the form', () => {
    const form = component.profileForm;

    expect(form.valid).toBeFalsy();

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toContain('Address isValid: false');

    const streetInput = form.controls.address.get('street');
    streetInput.setValue('123 Drew Street');

    expect(form.valid).toBeTruthy();

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toContain('Address isValid: true');
  });
});

@Component({
  selector: 'app-test-host-component',
  template: `<form [formGroup]="profileForm">
      <app-address [parentFormGroup]="profileForm" #address></app-address>
    </form>
    <p>Address isValid: {{ address.isValid }}</p>
    <p>Address isDirty: {{ address.isDirty }}</p> `
})
class TestHostComponent {
  constructor(private fb: FormBuilder) {}

  profileForm: FormGroup;

  ngOnInit() {
    this.profileForm = this.fb.group({});
  }
}
