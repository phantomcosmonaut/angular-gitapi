import { ToasterAppComponent } from './toaster/toaster.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToasterService } from './toaster/toaster.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ToasterAppComponent
  ],
  imports: [CommonModule, BrowserModule],
  providers: [ToasterService],
  bootstrap: [ToasterAppComponent],
  exports: [ToasterAppComponent]
})
export class ToasterModule { }
