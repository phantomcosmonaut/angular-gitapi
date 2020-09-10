import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlateSpinnerComponent } from './plate-spinner/plate-spinner.component';
import { GitRepoComponent } from './git-repo/git-repo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersPlotComponent } from './usersplot/usersplot.component';
import { LabelsPlotComponent } from './labelsplot/labelsplot.component';
import { NullablePipe } from './Pipes/nullable.pipe';
import { TestComponent } from './test/test.component';
import { IssuesplotComponent } from './issuesplot/issuesplot.component';
import { MainComponent } from './main/main.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlateSpinnerComponent,
    GitRepoComponent,
    LabelsPlotComponent,
    UsersPlotComponent,
    NullablePipe,
    TestComponent,
    IssuesplotComponent,
    MainComponent,
    CockpitComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
