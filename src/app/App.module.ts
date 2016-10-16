import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule, UIView} from 'ui-router-ng2';
import {CONSOLE_PROVIDER} from './providers/CONSOLE.provider';
import {ENTITIES_PROVIDER} from './providers/ENTITIES.provider';
import {ENV_PROVIDER} from './providers/ENV.provider';
import {TITLES_PROVIDER} from './providers/TITLES.provider';
import {APIService} from './services/API.service';
import {LoggingService} from './services/Logging.service';
import {ModelService} from './services/Model.service';
import {TitleService} from './services/Title.service';
import {AppComponent} from './states/App.component';
import {AppStates} from './states/App.states';
import {GalleriesComponent} from './states/galleries/Galleries.component';
import {GalleryComponent} from './states/galleries/gallery/Gallery.component';
import {NotFoundComponent} from './states/notFound/NotFound.component';
import {UIRouterConfig} from './states/UIRouter.config';

@NgModule({
  imports: [
    BrowserModule, HttpModule,
    UIRouterModule.forRoot(
        {states: AppStates, otherwise: {state: 'app', params: {}}, configClass: UIRouterConfig})
  ],
  declarations: [AppComponent, GalleriesComponent, GalleryComponent, NotFoundComponent],
  providers: [
    APIService, ModelService, TitleService, LoggingService, ENV_PROVIDER, TITLES_PROVIDER,
    ENTITIES_PROVIDER, CONSOLE_PROVIDER
  ],
  bootstrap: [UIView]
})
export class AppModule {
}
