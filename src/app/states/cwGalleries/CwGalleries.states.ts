import 'rxjs/add/operator/toPromise';
import {Ng2StateDeclaration} from 'ui-router-ng2';
import {Gallery} from '../../entities';
import {CwAPIService} from '../../services';
import {CwHeaderComponent} from '../cwHeader/CwHeader.component';
import {CwGalleriesComponent} from './CwGalleries.component';
import {CwGalleryStates} from './cwGallery/CwGallery.states';

export const CwGalleriesState: Ng2StateDeclaration = {
  name: 'galleries',
  parent: 'app',
  url: '^/galleries',
  views: {'main@': {component: CwGalleriesComponent}},
  resolve: [{
    token: 'galleries',
    deps: [CwAPIService],
    resolveFn: (apiService: CwAPIService): Promise<Array<Gallery>> => {
      return apiService.getCollection('/galleries').toPromise();
    }
  }]
};

export const CwGalleriesStates: Array<Ng2StateDeclaration> =
    [CwGalleriesState].concat(CwGalleryStates);
