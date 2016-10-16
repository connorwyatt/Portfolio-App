import {Gallery} from '../../../entities/Gallery.entity';
import {GalleryComponent} from './Gallery.component';

describe('GalleryComponent', () => {
  let gallery: GalleryComponent, galleryResolve: any;

  beforeEach(() => {
    galleryResolve = {};

    gallery = new GalleryComponent(<Gallery>galleryResolve);
  });

  it('should be defined', () => {
    expect(gallery).toBeDefined();
  });

  it('should set the gallery', () => {
    expect(gallery.gallery).toBe(galleryResolve);
  });
});
