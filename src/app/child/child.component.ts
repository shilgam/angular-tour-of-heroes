/* eslint-disable import/prefer-default-export */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() parentData;

  @Input('data') modifiedName;

  ngOnInit(): void {
    console.log('This is the parent data', this.parentData);
    console.log('This is the parent data', this.modifiedName);
  }
}
