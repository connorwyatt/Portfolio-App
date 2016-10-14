import {Ng2StateDeclaration} from 'ui-router-ng2';

import {AppComponent} from './App.component';
import {GalleriesStates} from './galleries/Galleries.states';
import {NotFoundStates} from './notFound/NotFound.states';

export const RootState: Ng2StateDeclaration = {
  name: 'app',
  component: AppComponent
};

export const AppStates: Array<Ng2StateDeclaration> =
    [RootState].concat(GalleriesStates, NotFoundStates);
