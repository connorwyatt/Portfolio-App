import { Route } from '@angular/router';
import { NotFoundComponent } from './NotFound.component';
import { TitleResolveService } from '../../services/resolves/TitleResolve.service';

export const NOT_FOUND_ROUTE: Route = {
  path: 'not-found',
  component: NotFoundComponent,
  resolve: {
    TitleResolveService
  }
};
