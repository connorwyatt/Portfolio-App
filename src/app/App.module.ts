import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule, UIView} from 'ui-router-ng2';
import {ENTITIES_PROVIDER} from './providers/ENTITIES.provider';
import {TITLES_PROVIDER} from './providers/TITLES.provider';
import {APIService} from './services/API.service';
import {ModelService} from './services/Model.service';
import {AppComponent} from './states/App.component';
import {AppStates} from './states/App.states';
import {GalleriesComponent} from './states/galleries/Galleries.component';
import {NotFoundComponent} from './states/notFound/NotFound.component';

@NgModule({
  imports: [
    BrowserModule, HttpModule,
    UIRouterModule.forRoot({states: AppStates, otherwise: {state: 'app', params: {}}})
  ],
  declarations: [AppComponent, GalleriesComponent, NotFoundComponent],
  providers: [APIService, ModelService, TITLES_PROVIDER, ENTITIES_PROVIDER],
  bootstrap: [UIView]
})
export class AppModule {
}
