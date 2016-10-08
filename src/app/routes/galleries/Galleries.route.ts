import { Route } from '@angular/router';
import { GalleriesComponent } from './Galleries.component';
import { TitleResolveService } from '../../services/resolves/TitleResolve.service';

export const GALLERIES_ROUTE: Route = {
  path: 'galleries',
  component: GalleriesComponent,
  resolve: {
    TitleResolveService
  }
};
