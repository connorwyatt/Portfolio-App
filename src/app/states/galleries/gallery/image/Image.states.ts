import {Ng2StateDeclaration, Transition} from 'ui-router-ng2';
import {Image} from '../../../../entities';
import {ImageComponent} from './Image.component';

export const ImageState: Ng2StateDeclaration = {
  name: 'image',
  parent: 'gallery',
  url: '/images/:imageId',
  views: {'main@': {component: ImageComponent}},
  resolve: [{
    token: 'image',
    deps: [Transition, 'images'],
    resolveFn: (transition: Transition, images: Array<Image>): Image => {
      return images.find((image: Image) => {
        return image.id === transition.params('to')['imageId'];
      });
    }
  }]
};

export const ImageStates: Array<Ng2StateDeclaration> = [ImageState];
