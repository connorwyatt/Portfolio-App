import {ElementRef} from '@angular/core';
import {ElementResizeDetectorMaker} from 'element-resize-detector';
import {CwElementResizeDirective} from './CwElementResize.directive';

describe('CwElementResizeDirective', () => {
  let cwElementResize: CwElementResizeDirective;
  let nativeElementMock: any;
  let elementRefMock: any;
  let elementResizeDetectorMakerMock: any;
  let elementResizeDetectorMock: any;

  beforeEach(() => {
    nativeElementMock = {};
    elementRefMock = {nativeElement: nativeElementMock};
    elementResizeDetectorMock = {listenTo: jasmine.createSpy('listenTo')};
    elementResizeDetectorMakerMock =
        jasmine.createSpy('elementResizeDetectorMaker').and.returnValue(elementResizeDetectorMock);

    cwElementResize = new CwElementResizeDirective(
        elementRefMock as ElementRef, elementResizeDetectorMakerMock as ElementResizeDetectorMaker);
  });

  it('should create an element resize detector', () => {
    expect(elementResizeDetectorMakerMock).toHaveBeenCalledWith({strategy: 'scroll'});
  });

  describe('Method: ngOnInit', () => {
    beforeEach(() => {
      cwElementResize.ngOnInit();
    });

    it('should listen to the element', () => {
      expect(elementResizeDetectorMock.listenTo)
          .toHaveBeenCalledWith(nativeElementMock, jasmine.any(Function));
    });
  });
});
