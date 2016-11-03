import {Ng2StateDeclaration} from 'ui-router-ng2';

import {CwGalleriesStates} from './cwGalleries/CwGalleries.states';
import {CwHeaderComponent} from './cwHeader/CwHeader.component';
import {CwLoginStates} from './cwLogin/CwLogin.states';
import {CwNotFoundStates} from './cwNotFound/CwNotFound.states';

export const CwAppState: Ng2StateDeclaration = {
  name: 'app',
  url: '/',
  views: {'header@': {component: CwHeaderComponent}},
  redirectTo: 'galleries'
};

export const CwAppStates: Array<Ng2StateDeclaration> =
    [CwAppState].concat(CwGalleriesStates, CwNotFoundStates, CwLoginStates);
