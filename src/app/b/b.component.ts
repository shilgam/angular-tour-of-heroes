/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {
  @Input('text') text = 'A message in the child component';

  ngOnInit(): void {}
}
