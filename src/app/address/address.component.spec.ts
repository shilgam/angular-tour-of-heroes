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
});

@Component({
  selector: 'app-profile-editor',
  template: '<app-address [parentFormGroup]="profileForm" #address></app-address>'
})
class TestHostComponent {
  constructor(private fb: FormBuilder) {}

  profileForm: FormGroup;

  ngOnInit() {
    this.profileForm = this.fb.group({});
  }
}
