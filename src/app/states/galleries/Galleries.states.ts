import {Ng2StateDeclaration} from 'ui-router-ng2';
import {GalleriesComponent} from './Galleries.component';

export const GalleriesState: Ng2StateDeclaration = {
  name: 'galleries',
  parent: 'app',
  url: '/galleries',
  component: GalleriesComponent
};

export const GalleriesStates: Array<Ng2StateDeclaration> = [GalleriesState];
