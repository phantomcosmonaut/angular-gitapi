import { Component, OnInit } from '@angular/core';
import { Spinner } from './plate-spinner';

@Component({
  selector: 'app-plate-spinner',
  templateUrl: './plate-spinner.component.html',
  styleUrls: ['./plate-spinner.component.scss']
})
export class PlateSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var spinner = new Spinner("#slideshow",".slide");
  }
}
