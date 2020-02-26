import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SelectDirectiveModule } from './select-directive/select-directive.module';
import { SelectElementModule } from './select-element/select-element.module';
import { SelectDirectiveReadModule } from './select-directive-read/select-directive-read.module';

import { AppComponent } from './app.component';
import { ParentComponent } from './view-child-decorator/view-child.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,
  SelectElementModule,
  SelectDirectiveModule, 
  SelectDirectiveReadModule ],
  declarations: [ AppComponent, ParentComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
