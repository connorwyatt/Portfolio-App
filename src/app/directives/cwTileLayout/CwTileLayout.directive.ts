import {AfterContentInit, ContentChildren, Directive, ElementRef, HostBinding, Inject, Input, OnChanges, OnInit, QueryList, SimpleChanges} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';
import {throttle} from 'lodash';
import {CwTileLayoutChildDirective} from './CwTileLayoutChild.directive';

export interface ICwTileLayoutConfigColumn {
  minWidth: number;
  columns: number;
}

export interface ICwTileLayoutConfig { padding?: number; }

const defaultConfig: ICwTileLayoutConfig = {
  padding: 0
};

@Directive({selector: '[cwTileLayout]'})
export class CwTileLayoutDirective implements OnChanges, AfterContentInit, OnInit {
  @Input() private tileLayoutConfig: ICwTileLayoutConfig;
  @Input() private tileLayoutColumns: Array<ICwTileLayoutConfigColumn> = [];
  @ContentChildren(CwTileLayoutChildDirective) private tiles: QueryList<CwTileLayoutChildDirective>;
  private nativeElement: HTMLElement;
  private elementResizeDetector: ElementResizeDetector;
  private throttledCalculateLayout: Function;
  private columnHeights: Array<number>;

  @HostBinding('style.position') private get position(){return 'relative'};

  @HostBinding('style.minHeight.px')
  private get containerHeight(): number{return Math.max(...this.columnHeights)};

  constructor(
      elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker) {
    this.nativeElement = elementRef.nativeElement;
    this.elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
    this.throttledCalculateLayout = throttle(this._calculateLayout, 100, {trailing: true});
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['tileLayoutConfig']) {
      this.tileLayoutConfig = Object.assign({}, defaultConfig, this.tileLayoutConfig);
    }
  }

  public ngOnInit() {
    this.elementResizeDetector.listenTo(this.nativeElement, () => {
      this.throttledCalculateLayout();
    });
  }

  public ngAfterContentInit() {
    this.calculateLayout();

    this.tiles.changes.subscribe(() => {
      this.throttledCalculateLayout();
    });
  }

  public calculateLayout() {
    this.throttledCalculateLayout();
  }

  private _calculateLayout(): void {
    const width = this.nativeElement.offsetWidth;
    const numberOfColumns = this.getNumberOfColumns(width, this.tileLayoutColumns);

    this.positionTiles(this.tiles, width, numberOfColumns);
  }

  private positionTiles(
      tiles: QueryList<CwTileLayoutChildDirective>, width: number, numberOfColumns: number): void {
    const columnWidth = this.getColumnWidth(width, numberOfColumns, this.tileLayoutConfig.padding);

    this.columnHeights =
        tiles.reduce((previousValue: Array<number>, tile: CwTileLayoutChildDirective) => {
          const smallestColumnIndex = this.getSmallestColumnIndex(previousValue);
          const isTopItem = previousValue[smallestColumnIndex] === 0;

          const topPadding = isTopItem ? 0 : this.tileLayoutConfig.padding;

          tile.setPosition({
            width: columnWidth,
            left: smallestColumnIndex * columnWidth +
                smallestColumnIndex * this.tileLayoutConfig.padding,
            top: previousValue[smallestColumnIndex] + topPadding
          });

          previousValue[smallestColumnIndex] += tile.height + topPadding;

          return previousValue;
        }, new Array(numberOfColumns).fill(0));
  }

  private getNumberOfColumns(width: number, columns: Array<ICwTileLayoutConfigColumn>): number {
    return columns
        .reduce(
            (previousValue: ICwTileLayoutConfigColumn, column: ICwTileLayoutConfigColumn) => {
              if (width >= column.minWidth && column.minWidth > previousValue.minWidth) {
                return column;
              }

              return previousValue;
            },
            {minWidth: 0, columns: 1})
        .columns;
  }

  private getSmallestColumnIndex(columns: Array<number>): number {
    return columns
        .reduce(
            (previousValue: {index: number, value: number}, column: number, index: number) => {
              if (!previousValue || column < previousValue.value) {
                return {index, value: column};
              }

              return previousValue;
            },
            null)
        .index;
  }

  private getColumnWidth(width: number, numberOfColumns: number, padding: number): number {
    const totalPadding = padding * (numberOfColumns - 1);
    const widthAfterPadding = width - totalPadding;

    return widthAfterPadding / numberOfColumns;
  }
}
