import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/App.module';
import 'style!./styles/styles.scss';

export function main(): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (ENV === 'PRODUCTION') {
  enableProdMode();
  main();
} else {
  let angular2hmr = require('angular2-hmr');
  angular2hmr.hotModuleReplacement(main, module);
}
