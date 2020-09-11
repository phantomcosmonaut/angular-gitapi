import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public location: Location) { }
  get backPage(){
    return this.location.path;
  }
  ngOnInit(): void {
    
  }

}
