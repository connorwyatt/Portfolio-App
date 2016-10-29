import {Gallery, Image} from '../../../entities';
import {CwGalleryComponent} from './CwGallery.component';

describe('CwGalleryComponent', () => {
  let cwGallery: CwGalleryComponent, galleryResolve: any, imagesResolve: any;

  beforeEach(() => {
    galleryResolve = {};
    imagesResolve = [];

    cwGallery = new CwGalleryComponent(<Gallery>galleryResolve, <Array<Image>>imagesResolve);
  });

  it('should be defined', () => {
    expect(cwGallery).toBeDefined();
  });

  it('should set the gallery', () => {
    expect(cwGallery.gallery).toBe(galleryResolve);
  });

  it('should set the images', () => {
    expect(cwGallery.images).toBe(imagesResolve);
  });
});
