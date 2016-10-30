import {Observable} from 'rxjs';
import {CwFileService} from './CwFile.service';
import Spy = jasmine.Spy;

describe('CwFileService', () => {
  let fileService: CwFileService;
  let FileReaderMock: any;
  let fileReaderInstanceMock: any;

  beforeEach(() => {
    fileReaderInstanceMock = {readAsDataURL: jasmine.createSpy('readAsDataURL')};

    FileReaderMock = jasmine.createSpy('FileReaderMock').and.returnValue(fileReaderInstanceMock);

    fileService = new CwFileService(FileReaderMock as typeof FileReader);
  });

  describe('Method: readFile', () => {
    let result: Observable<string>;
    let blob: any;

    beforeEach(() => {
      blob = {};

      result = fileService.readFile(blob as Blob);
    });

    it('should create a fileReader', () => {
      expect(FileReaderMock).toHaveBeenCalledWith();
    });

    it('should add an onloadend method to the fileReader', () => {
      expect(fileReaderInstanceMock.onloadend).toEqual(jasmine.any(Function));
    });

    it('should add an onerror method to the fileReader', () => {
      expect(fileReaderInstanceMock.onerror).toEqual(jasmine.any(Function));
    });

    describe('onloadend', () => {
      let nextSpy: Spy;
      let completeSpy: Spy;

      beforeEach(() => {
        nextSpy = jasmine.createSpy('next');
        completeSpy = jasmine.createSpy('complete');
        result.subscribe(nextSpy, null, completeSpy);

        fileReaderInstanceMock.result = 'base64';
        fileReaderInstanceMock.onloadend();
      });

      it('should emit the base64 string through the observable', () => {
        expect(nextSpy).toHaveBeenCalledWith('base64');
      });

      it('should complete the observable', () => {
        expect(completeSpy).toHaveBeenCalled();
      });
    });

    describe('onerror', () => {
      let errorSpy: Spy;
      let errorEvent: any;

      beforeEach(() => {
        errorEvent = {};
        errorSpy = jasmine.createSpy('error');
        result.subscribe(null, errorSpy);

        fileReaderInstanceMock.onerror(errorEvent);
      });

      it('should emit the error through the observable', () => {
        expect(errorSpy).toHaveBeenCalledWith(errorEvent);
      });
    });
  });
});
