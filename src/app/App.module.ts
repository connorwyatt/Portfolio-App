import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule} from 'ui-router-ng2';

import {CwButtonComponent, CwImageCardComponent, CwSidebarComponent} from './components';
import {CwElementResizeDirective, CwIconDirective, CwTileLayoutChildDirective, CwTileLayoutDirective} from './directives';
import {CONSOLE_PROVIDER, ELEMENT_RESIZE_DETECTOR_PROVIDER, ENTITIES_CONSTANT_PROVIDER, ENV_SERVICE_PROVIDER, FILE_READER_PROVIDER, REFLECTIVE_INJECTOR_PROVIDER, TITLES_CONSTANT_PROVIDER} from './providers';
import {CwAPIService, CwFileService, CwIconService, CwLoggingService, CwModelService, CwSidebarService, CwTitleService} from './services';
import {CwAppComponent} from './states/CwApp.component';
import {CwAppStates} from './states/CwApp.states';
import {CwGalleriesComponent} from './states/cwGalleries/CwGalleries.component';
import {CwGalleryComponent} from './states/cwGalleries/cwGallery/CwGallery.component';
import {CwImageComponent} from './states/cwGalleries/cwGallery/cwImage/CwImage.component';
import {CwHeaderComponent} from './states/cwHeader/CwHeader.component';
import {CwLoginComponent} from './states/cwLogin/CwLogin.component';
import {CwNotFoundComponent} from './states/cwNotFound/CwNotFound.component';
import {UIRouterConfig} from './states/UIRouter.config';

@NgModule({
  imports: [
    BrowserModule, HttpModule,
    UIRouterModule.forRoot(
        {states: CwAppStates, otherwise: 'not-found', configClass: UIRouterConfig})
  ],
  declarations: [
    CwAppComponent, CwGalleriesComponent, CwGalleryComponent, CwImageComponent, CwNotFoundComponent,
    CwLoginComponent, CwHeaderComponent, CwImageCardComponent, CwElementResizeDirective,
    CwTileLayoutDirective, CwTileLayoutChildDirective, CwButtonComponent, CwIconDirective,
    CwSidebarComponent
  ],
  providers: [
    CwAPIService, CwModelService, CwTitleService, CwFileService, CwLoggingService, CwIconService,
    CwSidebarService, ENV_SERVICE_PROVIDER, TITLES_CONSTANT_PROVIDER, ENTITIES_CONSTANT_PROVIDER,
    CONSOLE_PROVIDER, FILE_READER_PROVIDER, REFLECTIVE_INJECTOR_PROVIDER,
    ELEMENT_RESIZE_DETECTOR_PROVIDER
  ],
  bootstrap: [CwAppComponent]
})
export class AppModule {
}
