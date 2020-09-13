import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {slideInAnimation} from './animations/up-down';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor (){}
  
  prepareRoute(outlet: RouterOutlet){
    return (outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation)
  }
}
