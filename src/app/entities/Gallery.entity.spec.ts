import {Gallery} from './Gallery.entity';

describe('GalleryEntity', () => {
  let gallery: Gallery;

  beforeEach(() => {
    gallery = new Gallery();
  });

  it('should be defined', () => {
    expect(gallery).toBeDefined();
  });
});
