import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, Color, Pos } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterAppComponent implements OnInit {
  messages = new Array<Toast>();
  constructor(private service: ToasterService) {
    service.subject.subscribe((result) => {
      this.messages = result;
    }) 
}
  removeToast(toast: Toast){
    this.service.removeToast(toast);
  }
  ngOnInit(): void {
  }
}
