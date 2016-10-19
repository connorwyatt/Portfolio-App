import {Directive, ElementRef, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';

export interface ElementResizeEvent {
  element: HTMLElement;
  width: number;
  height: number;
}

@Directive({selector: '[elementResize]'})
export class ElementResizeDirective implements OnInit {
  @Output('onResize')
  onResize: EventEmitter<ElementResizeEvent> = new EventEmitter<ElementResizeEvent>();

  private _element: HTMLElement;
  private _elementResizeDetector: ElementResizeDetector;

  constructor(
      elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker) {
    this._element = elementRef.nativeElement;
    this._elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
  }

  ngOnInit() {
    this._elementResizeDetector.listenTo(this._element, (element) => {
      this.onResize.emit({element, width: element.offsetWidth, height: element.offsetHeight});
    });
  }
}
