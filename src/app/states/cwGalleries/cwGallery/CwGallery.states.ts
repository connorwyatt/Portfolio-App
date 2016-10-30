import {Ng2StateDeclaration, Transition} from 'ui-router-ng2';
import {Gallery, Image} from '../../../entities';
import {CwAPIService} from '../../../services';
import {CwGalleryComponent} from './CwGallery.component';
import {CwImageStates} from './cwImage/CwImage.states';

export const CwGalleryState: Ng2StateDeclaration = {
  name: 'gallery',
  parent: 'galleries',
  url: '/:galleryId',
  views: {'main@': {component: CwGalleryComponent}},
  resolve: [
    {
      token: 'gallery',
      deps: [Transition, 'galleries'],
      resolveFn: (transition: Transition, galleries: Array<Gallery>): Gallery => {
        return galleries.find((gallery: Gallery) => {
          return gallery.id === transition.params('to')['galleryId'];
        });
      }
    },
    {
      token: 'images',
      deps: [Transition, 'gallery', CwAPIService],
      resolveFn: (transition: Transition, gallery: Gallery, apiService: CwAPIService):
                     Promise<Array<Image>> => {
                       return apiService.getCollection(gallery.getLink('images').href).toPromise();
                     }
    }
  ]
};

export const CwGalleryStates: Array<Ng2StateDeclaration> = [CwGalleryState].concat(CwImageStates);
