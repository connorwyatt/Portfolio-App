import 'rxjs/add/operator/toPromise';
import {Ng2StateDeclaration} from 'ui-router-ng2';
import {Gallery} from '../../entities';
import {APIService} from '../../services/API.service';
import {HeaderComponent} from '../header/Header.component';
import {GalleriesComponent} from './Galleries.component';
import {GalleryStates} from './gallery/Gallery.states';

export const GalleriesState: Ng2StateDeclaration = {
  name: 'galleries',
  parent: 'app',
  url: '/galleries',
  views: {'header@app': {component: HeaderComponent}, 'main@app': {component: GalleriesComponent}},
  resolve: [{
    token: 'galleries',
    deps: [APIService],
    resolveFn: (apiService: APIService): Promise<Array<Gallery>> => {
      return apiService.getCollection('/galleries').toPromise();
    }
  }]
};

export const GalleriesStates: Array<Ng2StateDeclaration> = [GalleriesState].concat(GalleryStates);
