import {Ng2StateDeclaration, Transition} from 'ui-router-ng2';
import {Gallery, Image} from '../../../entities';
import {APIService} from '../../../services/API.service';
import {GalleryComponent} from './Gallery.component';

export const GalleryState: Ng2StateDeclaration = {
  name: 'gallery',
  parent: 'galleries',
  url: '/:galleryId',
  views: {'main@app': {component: GalleryComponent}},
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
      deps: [Transition, 'gallery', APIService],
      resolveFn: (transition: Transition, gallery: Gallery, apiService: APIService):
                     Promise<Array<Image>> => {
                       return apiService.getCollection(gallery.getLink('images').href).toPromise();
                     }
    }
  ]
};

export const GalleryStates: Array<Ng2StateDeclaration> = [GalleryState];
