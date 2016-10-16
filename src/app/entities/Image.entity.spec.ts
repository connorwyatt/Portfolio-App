import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {Image, ImageAttributes} from './Image.entity';

describe('ImageEntity', () => {
  let image: Image;

  beforeEach(() => {
    let resource: any = {attributes: {name: 'Main'}};

    image = new Image(<JSONAPIResourceIdentifierObject<ImageAttributes>>resource);
  });

  it('should be defined', () => {
    expect(image).toBeDefined();
  });

  describe('Method: getThumbnailImage', () => {
    let result: any;

    beforeEach(() => {
      spyOn(image, 'getLink').and.returnValue({href: ''});
      result = image.getThumbnailImage();
    });

    it('should get the thumbnail link', () => {
      expect(image.getLink).toHaveBeenCalledWith('thumbnailImage');
    });

    it('should return an observable that emits null', (done) => {
      result.subscribe((data: string) => {
        expect(data).toBeNull();
        done();
      });
    });
  });

  describe('Method: getOriginalImage', () => {
    let result: any;

    beforeEach(() => {
      spyOn(image, 'getLink').and.returnValue({href: ''});
      result = image.getOriginalImage();
    });

    it('should get the original link', () => {
      expect(image.getLink).toHaveBeenCalledWith('originalImage');
    });

    it('should return an observable that emits null', (done) => {
      result.subscribe((data: string) => {
        expect(data).toBeNull();
        done();
      });
    });
  });
});
