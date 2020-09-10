import { Component, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import anime from 'animejs';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent implements AfterViewInit {
  dashMeter = true;
  constructor (){}
  ngAfterViewInit(): void {
    var svg = document.querySelector("svg")
    let rect = svg.getBoundingClientRect()
    var width = rect.width;
    var height = rect.height + rect.top;
    const joystick = document.getElementById("layer4");
    const bar = document.getElementById("layer2")
    const dash = document.getElementById("layer3")
    const dashBar = document.getElementById("layer1")
    const btns = document.getElementById("g5268").children

    for(let i=0;i<btns.length; i++){
      let btn = <HTMLElement>btns[i]
      btn.onmousedown = (event) => {
        let c2 = <SVGRectElement>btn.children[2];
        c2.style.transform  = "translate(0px, -0.3px)"
        c2.style.height = (parseFloat(c2.style.height) + 0.3).toString()
        let c3 = <SVGRectElement>btn.children[1];
        c3.style.transform  = "translate(0px, -0.6px)"
        c3.style.height = (parseFloat(c3.style.height) - 0.3).toString()
      }
      btn.onmouseup = (event) => {
        let c2 = <SVGRectElement>btn.children[2];
        c2.style.transform  = "translate(0px, 0px)"
        c2.style.height = (parseFloat(c2.style.height) - 0.3).toString()
        let c3 = <SVGRectElement>btn.children[1];
        c3.style.transform  = "translate(0px, 0px)"
        c3.style.height = (parseFloat(c3.style.height) + 0.3).toString()
      }
    }
    var mousemove =  fromEvent(document, "mousemove")

    mousemove.subscribe((event: MouseEvent) => {
      let relX = (width/2 - event.clientX) / (width/2)
      let relY = (height - event.clientY) / height
      this.moveItem(joystick, 3*relX, 5*relY);
      this.moveItem(bar, 4*relX, 6*relY);
      this.moveItem(dash, 1*relX, 2*relY);
      this.moveItem(dashBar, 1*relX, 2*relY);
    })
    //ammo read out
    anime({
      targets: "#g3204 text tspan",
      opacity: [-1, 1],
      duration: 2000,
      loop: true,
      delay: anime.stagger(700),
      easing: 'steps(2)',
    })
  //blips
  anime({
    targets: ["#g3215-1"],
    opacity: [1, 0],
    duration: 2000,
    loop: true,
    endDelay: 300,
    easing: 'linear',
  })
  setTimeout(() => {anime({
    targets: ["#g3215"],
    opacity: [1, 0],
    duration: 2000,
    loop: true,
    endDelay: 300,
    easing: 'linear',
  })}, 100)
    //speedometer
    anime({
      targets: "#path6397",
      d: ["m 87.37865,126.02128 2.348177,-1.80247", "m 87.37865,126.02128 2.8,-0.77676"],
      duration: 10000,
      direction: 'alternate',
      loop: true,
      easing: 'linear',
    })

    //clouds
    var clouds = document.getElementById("clouds").children
    function loopCloud(el: any) {
      let elWidth = el.getBBox().width
      let elHeight = el.getBBox().height
      var x1 = 0;
      // var x2 = 10*x1;
      anime({
        targets: el,
        opacity: [{
          value: [0, 1],
          duration: 2000
        }], 
        translateY: [10, -450],
        // translateX: [x1, x2],
        scale: [0.1, 5],
        loop: false,
        easing: 'cubicBezier(1,0,1,0)',
        duration: 10000,
        complete: () => loopCloud(el),
        delay: anime.random(0, 700)
      })
    }

    for (let i = 0; i < clouds.length; i++) {
      let id = clouds[i];
      setTimeout((i) => loopCloud(id), i*1000)
    }

  }
  moveItem(item: HTMLElement, x:number, y:number): void{
    item.style.transform = "translate(" + x + "px," + y + "px)";
  }
  extractPoints(path: SVGPathElement): Array<Array<number>>{
    let points:Array<Array<number>> = [];
    let str: string = path.getAttribute("d");
    str.replace("m ", "").replace("z", "").split(" ").forEach(tup => {
      if(tup != ""){
        points.push(tup.split(",").map(x => parseFloat(x)))
      }
    })
    return points
  }
  
}
