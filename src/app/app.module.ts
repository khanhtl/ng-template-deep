import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ForDirective } from './directives/for.directive';
import { IfDirective } from './directives/if.directive';

@NgModule({
  declarations: [AppComponent, ForDirective, IfDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
