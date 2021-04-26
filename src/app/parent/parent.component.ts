/* eslint-disable import/prefer-default-export */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  data: string;

  ngOnInit(): void {
    this.data = 'Hii from parent';
  }
}
