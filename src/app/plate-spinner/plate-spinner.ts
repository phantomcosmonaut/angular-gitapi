import JQuery from '../../../node_modules/jquery';
import $ from 'jquery';

interface spinnerOptions{
  ellipseX?: number;
  ellipseY?: number;
  leftPad?: number;
  topPad?: number;
  depth?: number;
}
//Customizable
export class Spinner{
  _ellipseX: number;
  public get ellipseX() : number {
    return this._ellipseX;
  }
  public set ellipseX(value: number){
    this._ellipseX = value > 0 ? value : 400;
  }
  _ellipseY: number;
  public get ellipseY() : number {
    return this._ellipseY;
  }
  public set ellipseY(value: number){
    this._ellipseY = value > 0 ? value : 100;
  }
  leftPad: number;
  topPad: number;
  _depth: number;
  public get depth() : number {
    return this._depth;
  }
  public set depth(value: number){
    this._depth = (value <= 1 || value >= 0) ? value : 0.5;
  }
  //immutable
  private readonly parent: string;
  private readonly child: string;
  private readonly slides: JQuery;
  
  //velocity vector
  private mouseSpeed: number;
  private oldMouseX = 0;
  private newMouseX = 0;

  constructor(parentId: string, childClass: string, options?: spinnerOptions){
    this.ellipseX = options?.ellipseX ?? 400;
    this.ellipseY = options?.ellipseY ?? 100;
    this.leftPad = options?.leftPad ?? 0;
    this.topPad = options?.topPad ?? 0;
    this.depth = options?.depth ?? 0.5;

    this.parent = parentId;
    this.child = childClass;
    this.slides = $(this.parent).children(this.child)
    let parent = $(this.parent);
  parent.on("mousedown", (pointer) => {
    //moves slides in a negative or positive x direction based on position of the initial click
    var centerX = pointer.pageX
    this.newMouseX = this.oldMouseX = pointer.pageX
    //used for measuring mouse velocity
    this.mouseSpeed = window.setInterval(() => {
      this.oldMouseX = this.newMouseX;
    }, 50);

    parent.css("cursor", "grabbing")

    parent.on("mouseup", this, this.triggerEnd)
    parent.on("mouseleave", this, this.triggerEnd)
    parent.on("mousemove", (pointer) => {
      //update x position for velocity
      this.newMouseX = pointer.pageX
      //calculate the change in x direction
      let delta = pointer.pageX - centerX
      centerX = pointer.pageX
      //apply transformations
      this.slides.each(num => {
        let slide = $(this.slides[num]);
        this.transform(slide, delta)
      })
    })
  })
  this.initSlides()

    }

    static linspace(start: number, stop: number, n: number): number[] {
      var arr = Array(n);
      n--;
      for (var i = n; i >= 0; i--) {
        arr[i] = Math.round((i * stop + (n - i) * start) / n);
      }
      return arr;
    }

    initSlides(): void {
      //equal spacing between slides
      let slidePositions = Spinner.linspace(this.leftPad, this.ellipseX * 2  + this.leftPad, this.slides.length + 1)
      //initilatize positions
      this.slides.each(num => {
        let slide = $(this.slides[num]);
        let posX = slidePositions[num];
        let reverse = (this.depth < 0);
        slide.data("x", posX)
        slide.data("y", 0)
        slide.data("reverse", reverse)
        this.transform(slide, 0)
      });
    }

//get the y coordinate of a slide given x based on an elliptical formula
ellipse(x: number): number {
    //normalize x from (-ellipseX, ellipseX)
    x = x / 0.5 - this.ellipseX
    //calculate normalized y from (0, ellipseY)
    return this.ellipseY * Math.sqrt(1 - (x ** 2 / this.ellipseX ** 2))
  }

/*
process for transformation:
transformation of height occurs from top-down, width from left-right
so center the origin of scale by shifting element in the opposite direction of its motion
- shift x by delta
- check boundary
- calculate y
- shift y
- calculate scale
- apply scale
*/
transform(slide: JQuery, delta: number) {
  //set boundaries for ellipse
  let max = this.ellipseX + this.leftPad
  let min = this.leftPad
  let data = slide.data()
  //if the slide's x position exceeds a boundary, reverse slide direction and compensate for excess
  data.reverse ? data.x -= delta: data.x += delta;

  if (data.x > max) {
    data.x = max - (data.x - max)
    data.reverse = !data.reverse
  } else if (data.x < min) {
    data.x = min + (min - data.x)
    data.reverse = !data.reverse
  }

  let y = this.ellipse(data.x - this.leftPad);
  y = data.reverse ? (-y) : y;
  //scale in range (minSize, maxSize), cannot divide by zero
  if(this.ellipseY === 0){
    var relY1 = 0.5;
    var relY2 = 0.5;
  } else{
    var relY1 = -((y / this.ellipseY) / 2 - 0.5)
    var relY2 = (y / this.ellipseY) / 2 + 0.5

  }
  //This scaling formula linearly effects slides by their y coordinate
    let scale = relY1 * (1 - this.depth) + relY2

  //center the slide in parent container then apply delta y
  data.y = this.topPad + this.ellipseY + y
  var z = Math.trunc(data.y) + 100
  slide.css({
    "transform": "translate(" + data.x + "px, " + data.y + "px) scale("+ scale +")",
    "z-index": z
  })
}

triggerEnd(pointer: JQuery.TriggeredEvent) {
  let scope = pointer.data;
  let parent = $(scope.parent)
    parent.css("cursor", "grab")
    parent.off("mousemove")
    parent.off("mouseleave")
    parent.off("mouseup")
    window.clearInterval(scope.mouseSpeed)
    var velocity = scope.newMouseX - scope.oldMouseX
    if(velocity != 0){
      scope.endingAnimation(velocity)
    }
  }
  
endingAnimation(velocity: number) {
  var start;
  //5 is arbitrary
  var duration = Math.abs(5 * velocity);
  var delta = velocity / 5;

  var step = (timestamp) => {
    if (start === undefined) {
      start = timestamp;
    }
    let elapsed = Math.min((timestamp - start), duration)
    let time = elapsed / duration
    //ease-out-quadratic formula
    let x = (1 - time) ** 2
    x *= delta
    //floating points are unreliable and will cause jitter
    x = Math.round(x)
    this.slides.each(num => {
      let slide = $(this.slides[num]);
      this.transform(slide, x)
    })
    if (elapsed < duration && x != 0) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}
}

export interface SpinnerProperty{
  name: string;
  min: number;
  max: number;
  value: number;
  steps: number;
}