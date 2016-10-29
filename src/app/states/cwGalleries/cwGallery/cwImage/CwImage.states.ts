import {Ng2StateDeclaration, Transition} from 'ui-router-ng2';
import {Image} from '../../../../entities';
import {CwImageComponent} from './CwImage.component';

export const CwImageState: Ng2StateDeclaration = {
  name: 'image',
  parent: 'gallery',
  url: '/images/:imageId',
  views: {'main@': {component: CwImageComponent}},
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

export const CwImageStates: Array<Ng2StateDeclaration> = [CwImageState];
