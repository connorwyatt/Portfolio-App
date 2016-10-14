import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './App.component';
import {ENTITIES} from './constants/ENTITIES.constant';
import {TITLES} from './constants/TITLES.constant';
import {APIService} from './services/API.service';
import {ModelService} from './services/Model.service';
import {ENTITIES_TOKEN} from './tokens/ENTITIES.token';
import {TITLES_TOKEN} from './tokens/TITLES.token';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent],
  providers: [
    APIService, ModelService, {provide: TITLES_TOKEN, useValue: TITLES},
    {provide: ENTITIES_TOKEN, useValue: ENTITIES}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
