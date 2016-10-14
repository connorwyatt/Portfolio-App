import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule, UIView} from 'ui-router-ng2';
import {ENTITIES} from './constants/ENTITIES.constant';
import {TITLES} from './constants/TITLES.constant';
import {APIService} from './services/API.service';
import {ModelService} from './services/Model.service';
import {AppComponent} from './states/App.component';
import {AppStates} from './states/App.states';
import {GalleriesComponent} from './states/galleries/Galleries.component';
import {NotFoundComponent} from './states/notFound/NotFound.component';
import {ENTITIES_TOKEN} from './tokens/ENTITIES.token';
import {TITLES_TOKEN} from './tokens/TITLES.token';

@NgModule({
  imports: [
    BrowserModule, HttpModule,
    UIRouterModule.forRoot({states: AppStates, otherwise: {state: 'app', params: {}}})
  ],
  declarations: [AppComponent, GalleriesComponent, NotFoundComponent],
  providers: [
    APIService, ModelService, {provide: TITLES_TOKEN, useValue: TITLES},
    {provide: ENTITIES_TOKEN, useValue: ENTITIES}
  ],
  bootstrap: [UIView]
})
export class AppModule {
}
