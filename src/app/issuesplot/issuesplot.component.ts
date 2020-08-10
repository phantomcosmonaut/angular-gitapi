import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GitResponse, StatsDataIssue } from '../Classes';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import { Selection, select, selectAll } from 'd3-selection';
import { histogram, mean, line, curveBasis } from 'd3';

@Component({
  selector: 'app-issuesplot',
  templateUrl: './issuesplot.component.html',
  styleUrls: ['./issuesplot.component.scss']
})
export class IssuesplotComponent implements OnInit, AfterViewInit {

  @Input() data: GitResponse;
  @Input() property: string;
  margin: any = {top: 10, right: 10, bottom: 10, left: 10}
  constructor() { }

  ngOnInit(): void {
    if(this.data.issues[0][this.property] === undefined){
      throw new Error("invalid property accessor: " + this.property + ". Valid properties are: " + Object.keys(this.data.issues[0]))
    }
  }

  ngAfterViewInit(): void{
    this.DrawPlot();
  }
  Refresh(data: GitResponse){
    this.data = data;
    this.DrawPlot();
  }

  DrawPlot(): void{
    var issueData = this.data.issues.map(i => i[this.property]);
    var pullData = this.data.pulls.map(p => p[this.property]);
    var margin = this.margin;
    var svg = select('#issuesplot-' + this.property)
    var width = +svg.attr('width') - margin.left - margin.right;
    var height = +svg.attr('height') - margin.top - margin.bottom;
    var g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x_max = max([max(issueData), max(pullData)]);
    var x = scaleLinear()
      .domain([0, x_max])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    var kde = this.kernelDensityEstimator(this.kernelEpanechnikov(2), x.ticks(50))
    var density1: number[][] = kde(issueData);
    var density2: number[][] = kde(pullData);

    var y_max = max([max(density1.map(d => d[1])), max(density2.map(d => d[1]))]) + 0.05
    var y = scaleLinear()
      .range([height, 0])
      .domain([0, y_max]);
    svg.append("g")
      .call(axisLeft(y));

    svg.append("text").attr("x", width - 80).attr("y", 40).text("Issues").attr("fill", "#b83333").style("font-size", "25px");
    svg.append("text").attr("x", width - 80).attr("y", 80).text("Pulls").attr("fill", "#3333b8").style("font-size", "25px");

    // Plot the area
    svg.append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("stroke", "#b83333")
        .attr("stroke-width", 4)
        .attr("fill-opacity", 0)
        .attr("stroke-linejoin", "round")
        .attr("d", line()
          .curve(curveBasis)
            .x((d) => x(d[0]))
            .y((d) => y(d[1]))
        );
  
    // Plot the area
    svg.append("path")
        .attr("class", "mypath")
        .datum(density2)
        .attr("stroke", "#3333b8")
        .attr("fill-opacity", 0)
        .attr("stroke-width", 4)
        .attr("stroke-linejoin", "round")
        .attr("d", line()
          .curve(curveBasis)
            .x((d) => x(d[0]))
            .y((d) => y(d[1]))
        );
  }
  // Function to compute density
  kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, mean(V, function(v: any) { return kernel(x - v); })];
      });
    };
  } 
  kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }

}
