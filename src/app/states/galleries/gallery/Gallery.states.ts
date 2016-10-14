import {Ng2StateDeclaration, Transition} from 'ui-router-ng2';
import {Gallery} from '../../../entities/Gallery.entity';
import {GalleryComponent} from './Gallery.component';

export const GalleryState: Ng2StateDeclaration = {
  name: 'gallery',
  parent: 'galleries',
  url: '/:galleryId',
  views: {'main@app': {component: GalleryComponent}},
  resolve: [{
    token: 'gallery',
    deps: [Transition, 'galleries'],
    resolveFn: (transition: Transition, galleries: Array<Gallery>) => {
      return galleries.find((gallery: Gallery) => {
        return gallery.id === transition.params('to')['galleryId'];
      });
    }
  }]
};

export const GalleryStates: Array<Ng2StateDeclaration> = [GalleryState];
