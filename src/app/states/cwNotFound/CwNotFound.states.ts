import {Ng2StateDeclaration} from 'ui-router-ng2';
import {CwNotFoundComponent} from './CwNotFound.component';

export const CwNotFoundState: Ng2StateDeclaration = {
  name: 'not-found',
  parent: 'app',
  url: '^/not-found',
  views: {'main@': {component: CwNotFoundComponent}}
};

export const CwNotFoundStates: Array<Ng2StateDeclaration> = [CwNotFoundState];
