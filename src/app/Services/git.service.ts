import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, Subject, of, throwError, forkJoin, merge } from 'rxjs';
import { GitResponse, StatsDataIssue,  } from '../Classes';
import { Issue, User } from '../Interfaces'
import { environment } from 'src/environments/environment';
import { retry, catchError, reduce } from 'rxjs/operators';
import { GitStorageService } from './gitStorage.service';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private http : HttpClient, private storage: GitStorageService) { }

  get(repoId:string, etag: string, page: number){
    let url = environment.githubapi + "repos/" + repoId + "/issues";
    let response = this.http.get<Issue[]>(url, {
      withCredentials: false,
      responseType: "json" ,
      observe: "response",
      params: {
        state: "all", 
        per_page: "50",
        page: page.toString()
      },
      headers: {
        "If-None-Match": etag,
      }
    });
    return response.pipe<HttpResponse<Issue[]>>(catchError((err, caught) => this.handleError(err, caught)));
  }

  //data is the starting collection to which further data is appended
  getAll(repoId:string, data: GitResponse, numpages: number): Observable<GitResponse> {
    var httpArr: Observable<HttpResponse<Issue[]>>[] = [];
    for(let pagenum = 2; pagenum <= numpages; pagenum++){
      httpArr.push(this.get(repoId, "W/\"null\"", pagenum))
    }

    let finalResult = merge(...httpArr)
    .pipe(reduce<HttpResponse<Issue[]>, GitResponse>((data, res) => {
        return data.parseBody(res.body);
    }, data));

    return finalResult;
  }

  static parseHeaders(headers: HttpHeaders){
    if(headers.has("link")){
      var links = headers.get("link").split(",")
      var numpages = GitService.parseLinks(links)
    }
    else{
      var numpages = 1;
    }
    var newHeaders = new HttpHeaders({
      "x-rate": headers.get("x-ratelimit-limit"),
      "x-remaining": (+headers.get("x-ratelimit-remaining") - numpages + 1).toString(),
      "x-reset": headers.get("x-ratelimit-reset"),
      "etag": headers.get("etag")
    })
    return {headers: newHeaders, numpages: numpages};
  }

  static parseLinks(links: string[]): number{
    let numpages = 1;
    var pageMatch = new RegExp("(?<=[&?]page=)\\d+", "i");
    links.forEach(link => {
        if(link.includes("rel=\"last\"")){
          numpages = +pageMatch.exec(link)[0];
        }
      })
      console.log(numpages + " pages found.")
      return numpages
    }

  handleError(error: HttpErrorResponse, caught: Observable<HttpResponse<any>>){
    switch(error.status){
      case 304:
        var urlMatch = new RegExp("(?<=repos\/).+?(?=\/issues)", "i");
        let repoId = urlMatch.exec(error.url)[0];
        return of(new HttpResponse<any>({
          body: this.storage.getDataByRepoId(repoId),
          headers: null,
          status: error.status,
        }));
      case 404:
      case 403:
        return throwError("Repo Not Found or Access Denied.");
      default:
        return throwError(error)
    }
  }
  
}
