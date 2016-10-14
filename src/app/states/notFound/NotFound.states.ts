import {Ng2StateDeclaration} from 'ui-router-ng2';
import {NotFoundComponent} from './NotFound.component';

export const NotFoundState: Ng2StateDeclaration = {
  name: 'not-found',
  parent: 'app',
  url: '/not-found',
  views: {'main@app': {component: NotFoundComponent}}
};

export const NotFoundStates: Array<Ng2StateDeclaration> = [NotFoundState];
