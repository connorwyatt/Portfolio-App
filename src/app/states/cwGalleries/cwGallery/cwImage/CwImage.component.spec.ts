import {Image} from '../../../../entities';
import {CwImageComponent} from './CwImage.component';

describe('CwImageComponent', () => {
  let cwImage: CwImageComponent, imageResolve: any;

  beforeEach(() => {
    imageResolve = {};

    cwImage = new CwImageComponent(<Image>imageResolve);
  });

  it('should be defined', () => {
    expect(cwImage).toBeDefined();
  });

  it('should set the image', () => {
    expect(cwImage.image).toBe(imageResolve);
  });
});
