import {Ng2StateDeclaration} from 'ui-router-ng2';
import {CwGalleriesStates} from './cwGalleries/CwGalleries.states';
import {CwNotFoundStates} from './cwNotFound/CwNotFound.states';

export const CwAppState: Ng2StateDeclaration = {
  name: 'app',
  url: '/',
  redirectTo: 'galleries'
};

export const CwAppStates: Array<Ng2StateDeclaration> =
    [CwAppState].concat(CwGalleriesStates, CwNotFoundStates);
