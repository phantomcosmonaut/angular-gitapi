import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() id: number;
  public num: number = 99999;
  public str: string = "99999";
  constructor() { }

  ngOnInit(): void {
    console.log(this.id)
  }

}
