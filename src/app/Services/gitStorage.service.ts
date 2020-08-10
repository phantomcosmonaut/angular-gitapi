import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlotContainer, GitResponse } from '../Classes';

@Injectable({
  providedIn: 'root'
})
export class GitStorageService {
    public reposArray: PlotContainer[] = new Array<PlotContainer>();

    constructor(private http : HttpClient) { 
        //storage format as follows: {repoId: etag | etag: data}
        for(var key in Object.keys(localStorage)){
            let keyString: string = localStorage.key(+key);
            if(!keyString.startsWith("W/")){
                let container = new PlotContainer(keyString);
                let etag = localStorage[keyString]
                container.body = <GitResponse>JSON.parse(localStorage[etag]);
                this.reposArray.push(container);
            }
        }
    }
    SaveResponse(repoId: string, data: GitResponse){
        //only store relavtively small datasets
        try{
            if(data.issues.length + data.pulls.length + Object.keys(data.users).length < 1000)
            {
                //check if an etag is already saved to storage and remove it
                var etag = localStorage.getItem(repoId);
                localStorage.setItem(etag, JSON.stringify(data))
            }
        }
        catch(error){
            console.log("Local storage failed for: " + repoId)
        }
    }
    getDataByRepoId(repoId: string): GitResponse{
        let etag = localStorage.getItem(repoId);
        return JSON.parse(localStorage.getItem(etag));
    }

    AddContainer(container: PlotContainer){
        this.reposArray.push(container);
    }
    FindContainer(id: string){
        return this.reposArray.find(pc => pc.id === id);
    }
    GetContainers(){
        return this.reposArray;
    }
    RemoveContainer(container: PlotContainer){
        var ids = this.reposArray.map(pc => pc.id)
        var ind = ids.indexOf(container.id)
        this.reposArray.splice(ind, 1)
        let etag = localStorage.getItem(container.id);
        localStorage.removeItem(container.id);
        localStorage.removeItem(etag);
    }
    setEtag(repoId: string, etag: string): void{
        localStorage.setItem(repoId, etag);
    }
    getEtag(repoId: string): string{
        return localStorage.getItem(repoId);
    }
}
