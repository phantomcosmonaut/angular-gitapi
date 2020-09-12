import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import { GitRepoComponent } from './git-repo/git-repo.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { PlateSpinnerComponent } from './plate-spinner/plate-spinner.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "projects", component: HomeComponent, children:[
    {path: "", redirectTo: "github", pathMatch: "prefix"},
    {path: "github", component: GitRepoComponent},
    {path: 'cockpit', component: CockpitComponent},
    {path: 'plate-spinner', component: PlateSpinnerComponent}
  ]},
  {path: "about", component: AboutComponent},
  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
