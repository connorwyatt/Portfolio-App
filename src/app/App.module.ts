import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './App.component';
import {ENTITIES} from './constants/ENTITIES.constant';
import {TITLES} from './constants/TITLES.constant';
import {GALLERIES_ROUTE} from './routes/galleries/Galleries.route';
import {GalleriesResolveService} from './routes/galleries/GalleriesResolve.service';
import {NOT_FOUND_ROUTE} from './routes/notFound/NotFound.route';
import {APIService} from './services/API.service';
import {ModelService} from './services/Model.service';
import {TitleResolveService} from './services/resolves/TitleResolve.service';
import {ENTITIES_TOKEN} from './tokens/ENTITIES.token';
import {TITLES_TOKEN} from './tokens/TITLES.token';

@NgModule({
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot([
      GALLERIES_ROUTE, NOT_FOUND_ROUTE,
      {path: '', redirectTo: GALLERIES_ROUTE.path, pathMatch: 'full'},
      {path: '**', redirectTo: NOT_FOUND_ROUTE.path, pathMatch: 'full'}
    ])
  ],
  declarations: [GALLERIES_ROUTE.component, NOT_FOUND_ROUTE.component, AppComponent],
  providers: [
    TitleResolveService, GalleriesResolveService, APIService, ModelService,
    {provide: TITLES_TOKEN, useValue: TITLES}, {provide: ENTITIES_TOKEN, useValue: ENTITIES}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
