import * as elementResizeDetectorMaker from 'element-resize-detector';

export const ELEMENT_RESIZE_DETECTOR_PROVIDER = {
  provide: elementResizeDetectorMaker,
  useValue: elementResizeDetectorMaker
};
