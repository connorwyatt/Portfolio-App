import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule, UIView} from 'ui-router-ng2';
import {ImageCardComponent} from './components';
import {ElementResizeDirective} from './directives/ElementResize.directive';
import {TileLayoutDirective} from './directives/TileLayout.directive';
import {TileLayoutChildDirective} from './directives/TileLayoutChild.directive';
import {CONSOLE_PROVIDER} from './providers/CONSOLE.provider';
import {ELEMENT_RESIZE_DETECTOR_PROVIDER} from './providers/ELEMENT_RESIZE_DETECTOR.provider';
import {ENTITIES_CONSTANT_PROVIDER} from './providers/ENTITIES_CONSTANT.provider';
import {ENV_SERVICE_PROVIDER} from './providers/ENV_SERVICE.provider';
import {FILE_READER_PROVIDER} from './providers/FILE_READER.provider';
import {REFLECTIVE_INJECTOR_PROVIDER} from './providers/REFLECTIVE_INJECTOR.provider';
import {TITLES_CONSTANT_PROVIDER} from './providers/TITLES_CONSTANT.provider';
import {APIService} from './services/API.service';
import {FileService} from './services/File.service';
import {LoggingService} from './services/Logging.service';
import {ModelService} from './services/Model.service';
import {TitleService} from './services/Title.service';
import {AppComponent} from './states/App.component';
import {AppStates} from './states/App.states';
import {GalleriesComponent} from './states/galleries/Galleries.component';
import {GalleryComponent} from './states/galleries/gallery/Gallery.component';
import {ImageComponent} from './states/galleries/gallery/image/Image.component';
import {HeaderComponent} from './states/header/Header.component';
import {NotFoundComponent} from './states/notFound/NotFound.component';
import {UIRouterConfig} from './states/UIRouter.config';

@NgModule({
  imports: [
    BrowserModule, HttpModule,
    UIRouterModule.forRoot(
        {states: AppStates, otherwise: {state: 'app', params: {}}, configClass: UIRouterConfig})
  ],
  declarations: [
    AppComponent, GalleriesComponent, GalleryComponent, ImageComponent, NotFoundComponent,
    HeaderComponent, ImageCardComponent, ElementResizeDirective, TileLayoutDirective,
    TileLayoutChildDirective
  ],
  providers: [
    APIService, ModelService, TitleService, FileService, LoggingService, ENV_SERVICE_PROVIDER,
    TITLES_CONSTANT_PROVIDER, ENTITIES_CONSTANT_PROVIDER, CONSOLE_PROVIDER, FILE_READER_PROVIDER,
    REFLECTIVE_INJECTOR_PROVIDER, ELEMENT_RESIZE_DETECTOR_PROVIDER
  ],
  bootstrap: [UIView]
})
export class AppModule {
}
