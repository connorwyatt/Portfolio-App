import 'style!./styles/styles.scss';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/App.module';

if (ENV === 'PRODUCTION') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
