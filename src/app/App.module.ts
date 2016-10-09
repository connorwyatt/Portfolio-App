import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './App.component';
import { GALLERIES_ROUTE } from './routes/galleries/Galleries.route';
import { NOT_FOUND_ROUTE } from './routes/notFound/NotFound.route';
import { TitleResolveService } from './services/resolves/TitleResolve.service';
import { ENTITIES_TOKEN } from './tokens/ENTITIES.token';
import { ENTITIES } from './constants/ENTITIES.constant';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      GALLERIES_ROUTE,
      NOT_FOUND_ROUTE,
      { path: '', redirectTo: GALLERIES_ROUTE.path, pathMatch: 'full' },
      { path: '**', redirectTo: NOT_FOUND_ROUTE.path, pathMatch: 'full' }
    ])
  ],
  declarations: [
    GALLERIES_ROUTE.component,
    NOT_FOUND_ROUTE.component,
    AppComponent
  ],
  providers: [
    TitleResolveService,
    { provide: ENTITIES_TOKEN, useValue: ENTITIES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
