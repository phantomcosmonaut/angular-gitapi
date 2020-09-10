import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: []
})
export class HomeComponent implements OnInit {
  title = 'Home';
  isOpen = false;
  
  constructor() { }
  public toggle(bool: boolean){
    if(bool && this.isOpen){
      this.isOpen = !this.isOpen;
    } else if(!bool){
      this.isOpen = !this.isOpen;
    }
  }
  ngOnInit(): void {

  }
}
