import {Gallery} from '../../../entities/Gallery.entity';
import {Image} from '../../../entities/Image.entity';
import {GalleryComponent} from './Gallery.component';

describe('GalleryComponent', () => {
  let gallery: GalleryComponent, galleryResolve: any, imagesResolve: any;

  beforeEach(() => {
    galleryResolve = {};
    imagesResolve = [];

    gallery = new GalleryComponent(<Gallery>galleryResolve, <Array<Image>>imagesResolve);
  });

  it('should be defined', () => {
    expect(gallery).toBeDefined();
  });

  it('should set the gallery', () => {
    expect(gallery.gallery).toBe(galleryResolve);
  });

  it('should set the images', () => {
    expect(gallery.images).toBe(imagesResolve);
  });
});
