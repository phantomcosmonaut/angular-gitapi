import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Home';
  isOpen = false;

  constructor (){}
  public toggle(bool: boolean){
    if(bool && this.isOpen){
      this.isOpen = !this.isOpen;
    } else if(!bool){
      this.isOpen = !this.isOpen;
    }
  }
}
