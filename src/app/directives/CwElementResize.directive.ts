import {Directive, ElementRef, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';

export interface ElementResizeEvent {
  element: HTMLElement;
  width: number;
  height: number;
}

@Directive({selector: '[cwElementResize]'})
export class CwElementResizeDirective implements OnInit {
  @Output() onResize: EventEmitter<ElementResizeEvent> = new EventEmitter<ElementResizeEvent>();

  private element: HTMLElement;
  private elementResizeDetector: ElementResizeDetector;

  constructor(elementRef: ElementRef,
              @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker) {
    this.element = elementRef.nativeElement;
    this.elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
  }

  ngOnInit() {
    this.elementResizeDetector.listenTo(this.element, (element) => {
      this.onResize.emit({element, width: element.offsetWidth, height: element.offsetHeight});
    });
  }
}
