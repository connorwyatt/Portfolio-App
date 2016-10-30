import {Http, ResponseContentType} from '@angular/http';
import {Subject} from 'rxjs';
import {HttpMock} from '../mocks/Http.mock';
import {CwFileService} from '../services';
import {Image} from './Image.entity';

import Spy = jasmine.Spy;

describe('ImageEntity', () => {
  let image: Image, httpMock: any, httpObservable: any, fileServiceMock: any,
      readFileObservable: any;

  beforeEach(() => {
    httpObservable = new Subject();

    httpMock = new HttpMock();
    httpMock.get.and.returnValue(httpObservable);

    readFileObservable = new Subject();

    fileServiceMock = {readFile: jasmine.createSpy('readFile').and.returnValue(readFileObservable)};

    image = new Image(<Http>httpMock, <CwFileService>fileServiceMock);
  });

  it('should be defined', () => {
    expect(image).toBeDefined();
  });

  describe('Method: getThumbnailImage', () => {
    let nextSpy: Spy;

    beforeEach(() => {
      nextSpy = jasmine.createSpy('next');
      spyOn(image, 'getLink')
          .and.returnValue({href: 'thumbnailHref', meta: {width: 20, height: 10}});
      image.getThumbnailImage().subscribe(nextSpy);
    });

    it('should get the thumbnail link', () => {
      expect(image.getLink).toHaveBeenCalledWith('thumbnailImage');
    });

    it('should make a request for the image', () => {
      expect(httpMock.get).toHaveBeenCalledWith('thumbnailHref', {
        responseType: ResponseContentType.Blob
      });
    });

    describe('when calling the method again', () => {
      beforeEach(() => {
        httpMock.get.calls.reset();
      });

      it('should not re-request the image', () => {
        expect(httpMock.get).not.toHaveBeenCalled();
      });
    });

    describe('when the http request resolves', () => {
      let httpResponse: any;

      beforeEach(() => {
        httpResponse = {blob: _.constant('blob')};
        httpObservable.next(httpResponse);
      });

      it('should read the blob', () => {
        expect(fileServiceMock.readFile).toHaveBeenCalledWith('blob');
      });

      describe('when the file read finishes', () => {
        beforeEach(() => {
          readFileObservable.next('base64');
        });

        it('should emit a an imageObject through the returned observable', () => {
          expect(nextSpy).toHaveBeenCalledWith(
              {base64: 'base64', blob: 'blob', width: 20, height: 10});
        });
      });
    });
  });

  describe('Method: getMediumImage', () => {
    let nextSpy: Spy;

    beforeEach(() => {
      nextSpy = jasmine.createSpy('next');
      spyOn(image, 'getLink').and.returnValue({href: 'mediumHref', meta: {width: 20, height: 10}});
      image.getMediumImage().subscribe(nextSpy);
    });

    it('should get the medium link', () => {
      expect(image.getLink).toHaveBeenCalledWith('mediumImage');
    });

    it('should make a request for the image', () => {
      expect(httpMock.get).toHaveBeenCalledWith('mediumHref', {
        responseType: ResponseContentType.Blob
      });
    });

    describe('when calling the method again', () => {
      beforeEach(() => {
        httpMock.get.calls.reset();
      });

      it('should not re-request the image', () => {
        expect(httpMock.get).not.toHaveBeenCalled();
      });
    });

    describe('when the http request resolves', () => {
      let httpResponse: any;

      beforeEach(() => {
        httpResponse = {blob: _.constant('blob')};
        httpObservable.next(httpResponse);
      });

      it('should read the blob', () => {
        expect(fileServiceMock.readFile).toHaveBeenCalledWith('blob');
      });

      describe('when the file read finishes', () => {
        beforeEach(() => {
          readFileObservable.next('base64');
        });

        it('should emit a an imageObject through the returned observable', () => {
          expect(nextSpy).toHaveBeenCalledWith(
              {base64: 'base64', blob: 'blob', width: 20, height: 10});
        });
      });
    });
  });

  describe('Method: getOriginalImage', () => {
    let nextSpy: Spy;

    beforeEach(() => {
      nextSpy = jasmine.createSpy('next');
      spyOn(image, 'getLink')
          .and.returnValue({href: 'originalHref', meta: {width: 20, height: 10}});
      image.getOriginalImage().subscribe(nextSpy);
    });

    it('should get the original link', () => {
      expect(image.getLink).toHaveBeenCalledWith('originalImage');
    });

    it('should make a request for the image', () => {
      expect(httpMock.get).toHaveBeenCalledWith('originalHref', {
        responseType: ResponseContentType.Blob
      });
    });

    describe('when calling the method again', () => {
      beforeEach(() => {
        httpMock.get.calls.reset();
      });

      it('should not re-request the image', () => {
        expect(httpMock.get).not.toHaveBeenCalled();
      });
    });

    describe('when the http request resolves', () => {
      let httpResponse: any;

      beforeEach(() => {
        httpResponse = {blob: _.constant('blob')};
        httpObservable.next(httpResponse);
      });

      it('should read the blob', () => {
        expect(fileServiceMock.readFile).toHaveBeenCalledWith('blob');
      });

      describe('when the file read finishes', () => {
        beforeEach(() => {
          readFileObservable.next('base64');
        });

        it('should emit a an imageObject through the returned observable', () => {
          expect(nextSpy).toHaveBeenCalledWith(
              {base64: 'base64', blob: 'blob', width: 20, height: 10});
        });
      });
    });
  });
});
