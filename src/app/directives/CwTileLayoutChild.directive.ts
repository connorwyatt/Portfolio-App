import {Directive, ElementRef, forwardRef, Inject, OnInit} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';
import {IPosition} from '../interfaces/IPosition';
import {CwTileLayoutDirective} from './CwTileLayout.directive';

@Directive({selector: '[cwTileLayoutChild]'})
export class CwTileLayoutChildDirective implements OnInit {
  get height(): number {
    return this.element.offsetHeight;
  };

  private element: HTMLElement;
  private elementResizeDetector: ElementResizeDetector;
  private tileLayout: CwTileLayoutDirective;

  constructor(
      elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker,
      @Inject(forwardRef(() => CwTileLayoutDirective)) tileLayout: CwTileLayoutDirective) {
    this.element = elementRef.nativeElement;
    this.elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
    this.tileLayout = tileLayout;
  }

  ngOnInit() {
    this.element.style.position = 'absolute';

    this.elementResizeDetector.listenTo(this.element, () => {
      this.tileLayout.calculateLayout();
    });
  }

  setPosition(position: IPosition): void {
    this.element.style.left = position.left + 'px';
    this.element.style.top = position.top + 'px';
    this.element.style.width = position.width + 'px';
  }
}
