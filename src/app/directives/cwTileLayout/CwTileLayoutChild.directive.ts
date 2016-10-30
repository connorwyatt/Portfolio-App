import {Directive, ElementRef, forwardRef, Inject, OnInit} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';
import {IPosition} from '../../interfaces/IPosition';
import {CwTileLayoutDirective} from './CwTileLayout.directive';

@Directive({selector: '[cwTileLayoutChild]'})
export class CwTileLayoutChildDirective implements OnInit {
  get height(): number {
    return this.elementRef.nativeElement.offsetHeight;
  };

  private elementResizeDetector: ElementResizeDetector;

  constructor(
      private elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker,
      @Inject(forwardRef(() => CwTileLayoutDirective)) private tileLayout: CwTileLayoutDirective) {
    this.elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
  }

  public ngOnInit() {
    this.elementRef.nativeElement.style.position = 'absolute';

    this.elementResizeDetector.listenTo(this.elementRef.nativeElement, () => {
      this.tileLayout.calculateLayout();
    });
  }

  public setPosition(position: IPosition): void {
    const nativeElement = this.elementRef.nativeElement;

    nativeElement.style.left = position.left + 'px';
    nativeElement.style.top = position.top + 'px';
    nativeElement.style.width = position.width + 'px';
  }
}
