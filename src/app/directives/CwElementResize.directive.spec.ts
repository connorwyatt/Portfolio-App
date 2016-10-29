import {ElementRef} from '@angular/core';
import {ElementResizeDetectorMaker} from 'element-resize-detector';
import {CwElementResizeDirective} from './CwElementResize.directive';

describe('CwElementResizeDirective', () => {
  let cwElementResize: CwElementResizeDirective, nativeElementMock: any, elementRefMock: any,
      elementResizeDetectorMakerMock: any, elementResizeDetectorMock: any;

  beforeEach(() => {
    nativeElementMock = {};
    elementRefMock = {nativeElement: nativeElementMock};
    elementResizeDetectorMock = {listenTo: jasmine.createSpy('listenTo')};
    elementResizeDetectorMakerMock =
        jasmine.createSpy('elementResizeDetectorMaker').and.returnValue(elementResizeDetectorMock);

    cwElementResize = new CwElementResizeDirective(
        <ElementRef>elementRefMock, <ElementResizeDetectorMaker>elementResizeDetectorMakerMock);
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

    describe('on resize', () => {
      let element: any;

      beforeEach(() => {
        spyOn(cwElementResize.onResize, 'emit');

        const listener: (element: HTMLElement) => void =
            elementResizeDetectorMock.listenTo.calls.argsFor(0)[1];

        element = {offsetWidth: 20, offsetHeight: 10};

        listener(<HTMLElement>element);
      });

      it('should emit an onResize event', () => {
        expect(cwElementResize.onResize.emit).toHaveBeenCalledWith({
          element,
          width: element.offsetWidth,
          height: element.offsetHeight
        });
      });
    });
  });
});
