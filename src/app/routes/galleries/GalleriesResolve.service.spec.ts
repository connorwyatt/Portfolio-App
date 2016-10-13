import { APIService } from '../../services/API.service';
import { GalleriesResolveService } from './GalleriesResolve.service';

describe('GalleriesResolveService', () => {
  let galleriesResolveService: GalleriesResolveService, apiServiceMock: any;

  beforeEach(() => {
    apiServiceMock = { getCollection: jasmine.createSpy('getCollection') };

    galleriesResolveService = new GalleriesResolveService(<APIService>apiServiceMock);
  });

  describe('Method: resolve', () => {
    let result: any;

    beforeEach(() => {
      apiServiceMock.getCollection.and.returnValue('collection');

      result = galleriesResolveService.resolve();
    });

    it('should call the correct endpoint', () => {
      expect(apiServiceMock.getCollection).toHaveBeenCalledWith('/api/galleries');
    });

    it('should return the collection', () => {
      expect(result).toBe('collection');
    });
  });
});
