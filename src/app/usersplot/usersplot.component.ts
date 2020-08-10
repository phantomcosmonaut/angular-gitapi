import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { select, selectAll } from 'd3-selection';
import { hierarchy, treemap } from 'd3-hierarchy';
import { max } from 'd3-array';
import { scaleSequential } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import { StatsDataUser } from '../Interfaces';

@Component({
  selector: 'app-usersplot',
  templateUrl: './usersplot.component.html',
  styleUrls: ['./usersplot.component.scss']
})
export class UsersPlotComponent implements OnInit, AfterViewInit{

  @Input() users: {[login: string]: StatsDataUser};

  private margin: any = {top: 5, right: 5, bottom: 5, left: 5}
  private padding: number = 4;
  public NullUser: StatsDataUser = {
    login: "---",
    html_url: "#user-display",
    avatar_url: "https://pluspng.com/img-png/github-octocat-logo-vector-png-png-ico-icns-svg-more-512.png",
    issueCount: 0, 
    pullCount: 0, 
    assignedCount: 0,
  }
  public User: StatsDataUser = this.NullUser;
  get avatar_url(){
    return this.User.avatar_url
  }
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    this.DrawPlot()
  }
  Refresh(users: {[login: string]: StatsDataUser}){
    this.users = users;
    this.User = this.NullUser;
    this.DrawPlot();
  }
  DrawPlot(){
    var component = this;
    var users = this.users;
    var margin = this.margin;
    var svg = select('#users');
    var width = +svg.attr('width') - margin.left - margin.right;
    var height = +svg.attr('height') - margin.top - margin.bottom;
    var background = svg.append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', svg.attr('width'))
    .attr('height', svg.attr('height'))
    .attr('fill', 'black')
    var g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var maximum = max(Object.values(users), (d: any) => d.issueCount + d.pullCount + d.assignedCount);
    var myColor = scaleSequential(interpolate("#b4b2f7", "#5f00b8")).domain([1, maximum])
    var data = {name: "TopNode", children: Object.values(users)};
    var root = hierarchy<any>(data).sum((d) =>
        (d.issueCount + d.pullCount + d.assignedCount))
    treemap().size([width, height]).padding(this.padding)(root);
    var boxes = g.selectAll(".box")
    .data(root.leaves())
    .enter();
    boxes.append("rect")
    .attr('x', (d: any) => d.x0)
    .attr('y', (d: any) => d.y0)
    .attr('width', (d: any) => d.x1 - d.x0)
    .attr('height', (d: any) => d.y1 - d.y0)
    .attr("fill", (d: any) => myColor(d.value))
    .on("mouseover", function(event) {
      select<SVGRectElement, any>(this)
      .attr('stroke', 'white')
      .attr('stroke-width', '2px');
    })
    .on("mouseout", function(event){
      var box = select<SVGRectElement, any>(this);
      box.attr('stroke-width', '0px')    
    })
    .on("click", function(event){
      var box = select<SVGRectElement, any>(this);
      component.User = box.data()[0].data;
    })
    .attr('opacity', 0)
    .transition()
    .duration(() => Math.random()*700 + 500)
    .attr('opacity', 1);
  }
}
