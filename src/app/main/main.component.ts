import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToasterService } from '../../toasterModule/toaster/toaster.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    
  }

}
