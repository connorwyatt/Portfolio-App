import { Route } from '@angular/router';
import { TitleResolveService } from '../../services/resolves/TitleResolve.service';
import { NotFoundComponent } from './NotFound.component';

export const NOT_FOUND_ROUTE: Route = {
  path: 'not-found',
  component: NotFoundComponent,
  resolve: { TitleResolveService }
};
