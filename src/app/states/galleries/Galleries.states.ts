import 'rxjs/add/operator/toPromise';
import {Ng2StateDeclaration} from 'ui-router-ng2';
import {APIService} from '../../services/API.service';
import {GalleriesComponent} from './Galleries.component';

export const GalleriesState: Ng2StateDeclaration = {
  name: 'galleries',
  parent: 'app',
  url: '/galleries',
  component: GalleriesComponent,
  resolve: [{
    token: 'galleries',
    deps: [APIService],
    resolveFn: (apiService: APIService) => {
      return apiService.getCollection('/api/galleries').toPromise();
    }
  }]
};

export const GalleriesStates: Array<Ng2StateDeclaration> = [GalleriesState];
