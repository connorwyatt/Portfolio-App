declare module "element-resize-detector" {
  type ElementResizeDetectorMaker = (elementResizeDetectorConfig: ElementResizeDetectorConfig) => ElementResizeDetector;

  interface ElementResizeDetectorConfig {
    strategy: 'scroll';
  }

  interface ElementResizeDetector {
    listenTo: (element: HTMLElement, callback: (element: HTMLElement) => any) => void;
    removeListener: (element: HTMLElement, callback: (element: HTMLElement) => any) => void;
  }
}
