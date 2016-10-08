import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './App.component';
import { GALLERIES_ROUTE } from './routes/galleries/Galleries.route';
import { TitleResolveService } from './services/resolves/TitleResolve.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      GALLERIES_ROUTE,
      { path: '', redirectTo: GALLERIES_ROUTE.path, pathMatch: 'full' }
    ])
  ],
  declarations: [
    GALLERIES_ROUTE.component,
    AppComponent
  ],
  providers: [
    TitleResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
