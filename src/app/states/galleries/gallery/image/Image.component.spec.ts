import {Image} from '../../../../entities';
import {ImageComponent} from './Image.component';

describe('ImageComponent', () => {
  let image: ImageComponent, imageResolve: any;

  beforeEach(() => {
    imageResolve = {};

    image = new ImageComponent(<Image>imageResolve);
  });

  it('should be defined', () => {
    expect(image).toBeDefined();
  });

  it('should set the image', () => {
    expect(image.image).toBe(imageResolve);
  });
});
