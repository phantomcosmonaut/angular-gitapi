import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { Selection, select, selectAll } from 'd3-selection';
import { StatsDataLabel } from '../Interfaces';

@Component({
  selector: 'app-labelsplot',
  templateUrl: './labelsplot.component.html',
  styleUrls: ['./labelsplot.component.scss']
})
export class LabelsPlotComponent implements OnInit, AfterViewInit {
  @Input() labels: {[name: string]: StatsDataLabel};
  @Input() repoUrl: string;
  margin: any = {top: 10, right: 30, bottom: 10, left: 150}
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.DrawPlot();
  }
  Refresh(labels: {[name: string]: StatsDataLabel}, url: string){
    this.labels = labels;
    this.repoUrl = url;
    this.DrawPlot();
  }
  DrawPlot(): void{
    var labels = this.labels;
    var margin = this.margin;
    var data = Object.keys(labels);
    data.sort((a,b) => labels[a].count - labels[b].count)

    var svg = select('#labels')

    var width = +svg.attr('width') - margin.left - margin.right;
    var height = +svg.attr('height') - margin.top - margin.bottom;
    var g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var y = scaleBand().rangeRound([height, 0]).padding(0);
    var x = scaleLinear().rangeRound([0, width]);
    y.domain(data.map<any>((d) => d));
    x.domain([0, max<any, any>(Object.values(labels), (label) => label.count)]);
    g.append('g')
      .attr('class', 'axis y-axis')
      .call(axisLeft(y))

    var bars = g.selectAll('.bar')
      .data(data)
      .enter();
    bars.append('a')
    .attr('href', (d) => this.repoUrl+"/issues?q=label%3A"+ "\"" + d + "\"")
    .attr('target', "_blank")
    .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d) => y(d))
      .attr('height', y.bandwidth())
      .attr('fill', (d) => "#" + labels[d].color)
      .on("mouseover", function(){ 
        selectAll<SVGRectElement, any>(".bar")
        .attr("fill", "lightgrey")
        select<SVGRectElement, any>(this)
        .attr("fill", (d) => "#" + labels[d].color);
      })
      .on("mouseout", function(){ 
        selectAll<SVGRectElement, any>(".bar").attr("fill", (d) => "#" + labels[d].color)
      })
      .transition()
      .duration(1000)
      .attr('width', (d) => x(labels[d].count))
    bars.append("text")
      .attr('class', 'label')
      .attr("y", (d) => y(d) + y.bandwidth() / 2 + 4)
      .text((d) => labels[d].count)
      .attr('x', 3)
      .transition()
      .duration(1000)
      .attr('x', (d) => x(labels[d].count) + 3)

    selectAll(".axis>.tick>text")
    .each(function(d, i){
      select(this).style("font-size","15px");
    });
  }

}
