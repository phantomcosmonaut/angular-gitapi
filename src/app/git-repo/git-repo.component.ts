import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GitService } from '../Services/git.service';
import { GitStorageService } from '../Services/gitStorage.service';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import 'd3-transition';
import { PlotContainer, GitResponse } from '../Classes';
import { LabelsPlotComponent } from '../labelsplot/labelsplot.component';
import { UsersPlotComponent } from '../usersplot/usersplot.component';
import { selectAll } from 'd3-selection';
import { IssuesplotComponent } from '../issuesplot/issuesplot.component';
import { Observable, fromEvent } from 'rxjs';
import { ToasterService, Toast, Color } from 'src/toasterModule/toaster/toaster.service';

@Component({
  selector: 'app-git-repo',
  templateUrl: './git-repo.component.html',
  styleUrls: ['./git-repo.component.scss'],
})
export class GitRepoComponent implements AfterViewInit {
  get issues(){
    return this.currentContainer.body.issues;
  }
  get pulls(){
    return this.currentContainer.body.pulls;
  }
  get labels(){
    return this.currentContainer.body.labels
  }
  get users(){
    return this.currentContainer.body.users
  }
  get repos(){
    return this.storage.GetContainers();
  }
  get resetTime(): Date{
    return this.headers?.has("x-reset") ? new Date(+this.headers?.get("x-reset")*1000) : null
  }
  get remaining() {
    return this.headers?.has("x-remaining") ? this.headers.get("x-remaining") : "-"
  }
  get url(): string{
    return "https://github.com/" + this.currentContainer.id
  }
  get formOwner(){
    return this.repoForm.get('owner').value;
  }
  get formRepo(){
    return this.repoForm.get('repo').value;
  }
  @ViewChild('Labels')
  private labelComponent: LabelsPlotComponent;
  @ViewChild('Users')
  private userComponent: UsersPlotComponent;
  @ViewChild('comments')
  private commentsComponent: IssuesplotComponent;
  @ViewChild('dtc')
  private dtcComponent: IssuesplotComponent;
  public headers: HttpHeaders;
  public currentContainer: PlotContainer;
  public loading: boolean = false;

  constructor(private toaster: ToasterService, private git: GitService, private formBuilder: FormBuilder, private storage: GitStorageService) { }
    repoForm = this.formBuilder.group({
      owner: "",
      repo: ""
  })

  ngAfterViewInit() {
    //create tooltip
    const xrate = document.getElementById("rate-info-q")
    const xrateContent = document.getElementById("rate-info-q-content");
    fromEvent(xrate, "mouseenter").subscribe((event) => {
      var offset = xrate.offsetTop;
      xrateContent.style.top = (offset + 20).toString() + "px";
      xrateContent.style.display = "block";
    })
    fromEvent(xrate, "mouseleave").subscribe(() => {
      xrateContent.style.display = "none";
    })
  }
  SelectContainer(id: string){
    selectAll("svg > *").remove();
    this.currentContainer = this.storage.FindContainer(id);
    if(this.userComponent){
      this.userComponent.Refresh(this.users);
      this.labelComponent.Refresh(this.labels, this.url);
      this.commentsComponent.Refresh(this.currentContainer.body)
    }
  }
  GetRepo(){
    let owner: string = this.formOwner;
    let repoName: string = this.formRepo;
    this.currentContainer = null;
    this.loading = true;
    let repoId = owner + "/" + repoName
    let etag = this.storage.getEtag(repoId) ?? "\"PeanutButterJelly\"";
    var response = this.git.get(repoId, etag, 1)
    response.subscribe(res =>{
      if(res.status === 304){
        this.UpdateRepos(repoId, this.storage.getDataByRepoId(repoId));
        this.loading = false
      }
      else{
        var headerInfo = GitService.parseHeaders(res.headers)
        if(+headerInfo.headers.get("x-remaining") < headerInfo.numpages){
          throw new Error("Rate limit exceeded.");
        }
        let data = new GitResponse();
        data.parseBody(res.body);
        this.storage.setEtag(repoId, headerInfo.headers.get("etag"))
        this.headers = headerInfo.headers;
        let gitResponse = this.git.getAll(repoId, data, headerInfo.numpages);
        gitResponse.subscribe(finalResult => {
          this.storage.SaveResponse(repoId, finalResult);
          this.UpdateRepos(repoId, finalResult)
          this.loading = false
        })
      }
    }, error => {
      this.toaster.addToast({message: error.toString(), bgColor: Color.danger, lifespan: 7000}); 
      this.loading = false 
    })
  }

  UpdateRepos(repoId: string, data: GitResponse){
    let container = this.storage.FindContainer(repoId)
    if(!container){
      container = new PlotContainer(repoId);
      this.storage.AddContainer(container);
    }
    container.body = data;
    this.SelectContainer(container.id)
  }
  DeleteRepo(){
    this.storage.RemoveContainer(this.currentContainer)
    this.currentContainer = null;
    this.toaster.addToast({message: "Repo Deleted", bgColor: Color.danger, lifespan: 2000});
  }
}
