/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    aliases: new FormArray([new FormControl('')])
  });

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value); // NOTE: logs to browser console
  }

  ngOnInit(): void {}

  updateProfile(): void {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  get aliases(): FormArray {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias(): void {
    this.aliases.push(new FormControl(''));
  }
}
