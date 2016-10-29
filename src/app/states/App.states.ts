import {Ng2StateDeclaration} from 'ui-router-ng2';
import {GalleriesStates} from './galleries/Galleries.states';
import {NotFoundStates} from './notFound/NotFound.states';

export const RootState: Ng2StateDeclaration = {
  name: 'app',
  url: '/',
  redirectTo: 'galleries'
};

export const AppStates: Array<Ng2StateDeclaration> =
    [RootState].concat(GalleriesStates, NotFoundStates);
