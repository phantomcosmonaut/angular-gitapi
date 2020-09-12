import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Spinner, SpinnerProperty } from './plate-spinner';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-plate-spinner',
  templateUrl: './plate-spinner.component.html',
  styleUrls: ['./plate-spinner.component.scss']
})
export class PlateSpinnerComponent implements AfterViewInit {

  constructor() { }
  public sliders: SpinnerProperty[] = [
    {name: "ellipseX", min: 100, max: 700, value: 400, steps: 1},
    {name: "ellipseY", min: -50, max: 150, value: 50, steps: 1},
    {name: "leftPad", min: -50, max: 150, value: 50, steps: 1},
    {name: "topPad", min: -50, max: 150, value: 50, steps: 1},
    {name: "depth", min: 0, max: 1, value: 0.5, steps: 0.1}
    ]

  ngAfterViewInit(): void {
    var spinner = new Spinner("#slideshow",".slide");
    var sliders = document.getElementsByClassName("range-slider");
    for(let i=0; i<sliders.length; i++){
      let slide = sliders[i];
      let prop = this.sliders.find(s => s.name === slide.getAttribute("id"))
      slide.setAttribute("value", prop.value.toString());
      fromEvent(slide, "change").subscribe((event: any) => {
        let val = parseFloat(event.target.value);
        spinner[prop.name] = prop.value = val;
        spinner.initSlides()
      })
    }
  }
}
