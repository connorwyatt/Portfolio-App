import {Directive, ElementRef, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';

export interface ICwElementResizeEvent {
  element: HTMLElement;
  width: number;
  height: number;
}

@Directive({selector: '[cwElementResize]'})
export class CwElementResizeDirective implements OnInit {
  @Output()
  private onResize: EventEmitter<ICwElementResizeEvent> = new EventEmitter<ICwElementResizeEvent>();
  private elementResizeDetector: ElementResizeDetector;

  constructor(
      private elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker) {
    this.elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
  }

  public ngOnInit() {
    this.elementResizeDetector.listenTo(this.elementRef.nativeElement, (element) => {
      this.onResize.emit({element, width: element.offsetWidth, height: element.offsetHeight});
    });
  }
}
