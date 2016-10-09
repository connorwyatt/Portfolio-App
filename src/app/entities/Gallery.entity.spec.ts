import {
  Gallery,
  GalleryAttributes
} from './Gallery.entity';
import { JSONAPIResourceIdentifierObject } from '../interfaces/JSONAPI';

describe('GalleryEntity', () => {
  let gallery: Gallery;

  beforeEach(() => {
    let resource = {
      attributes: {
        name: 'Main'
      }
    };

    gallery = new Gallery(<JSONAPIResourceIdentifierObject<GalleryAttributes>>resource);
  });

  it('should be defined', () => {
    expect(gallery).toBeDefined();
  });
});
