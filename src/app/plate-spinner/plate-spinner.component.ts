import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Spinner, SpinnerProperty } from './plate-spinner';
import { fromEvent } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plate-spinner',
  templateUrl: './plate-spinner.component.html',
  styleUrls: ['./plate-spinner.component.scss']
})
export class PlateSpinnerComponent implements AfterViewInit {
  public form: FormGroup;
  public spinner: Spinner;
  public sliders: SpinnerProperty[] = [
    {name: "ellipseX", min: 100, max: 700, value: 400, steps: 1},
    {name: "ellipseY", min: 1, max: 150, value: 50, steps: 1},
    {name: "leftPad", min: -50, max: 150, value: 50, steps: 1},
    {name: "topPad", min: -50, max: 150, value: 50, steps: 1},
    {name: "depth", min: 0, max: 1, value: 0.5, steps: 0.1}
    ]
  constructor(private builder: FormBuilder) {
    let formProps = {};
    this.sliders.forEach(slider => formProps[slider.name] = slider.value)
    this.form = this.builder.group(formProps)
  }
  updateSlides(slider: SpinnerProperty){
    let val = this.form.get(slider.name).value
    this.spinner[slider.name] = val
    this.spinner.initSlides();
  }

  ngAfterViewInit(): void {
    this.spinner = new Spinner("#slideshow",".slide");
    this.spinner.initSlides()
  }
}
