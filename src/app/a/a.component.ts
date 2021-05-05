/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {
  name = 'I am A component';

  text = 'A message for the child component';

  ngOnInit(): void {}
}
