import {Directive, ElementRef, forwardRef, Inject} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';

import {IPosition} from '../interfaces/IPosition';

import {TileLayoutDirective} from './TileLayout.directive';

@Directive({selector: '[tileLayoutChild]'})
export class TileLayoutChildDirective {
  get height(): number {
    return this._element.offsetHeight;
  };

  private _element: HTMLElement;
  private _elementResizeDetector: ElementResizeDetector;
  private _tileLayout: TileLayoutDirective;

  constructor(
      elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker,
      @Inject(forwardRef(() => TileLayoutDirective)) tileLayout: TileLayoutDirective) {
    this._element = elementRef.nativeElement;
    this._elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
    this._tileLayout = tileLayout;
  }

  ngOnInit() {
    this._element.style.position = 'absolute';

    this._elementResizeDetector.listenTo(this._element, () => {
      this._tileLayout.calculateLayout();
    });
  }

  setPosition(position: IPosition): void {
    this._element.style.left = position.left + 'px';
    this._element.style.top = position.top + 'px';
    this._element.style.width = position.width + 'px';
  }
}
