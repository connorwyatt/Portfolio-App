import {AfterContentInit, ContentChildren, Directive, ElementRef, HostBinding, Inject, Input, OnChanges, OnInit, QueryList, SimpleChanges} from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import {ElementResizeDetector, ElementResizeDetectorMaker} from 'element-resize-detector';
import {debounce} from 'lodash';

import {TileLayoutChildDirective} from './TileLayoutChild.directive';

export interface TileLayoutConfigColumn {
  minWidth: number;
  columns: number;
}

export interface TileLayoutConfig { padding?: number; }

const defaultConfig: TileLayoutConfig = {
  padding: 0
};

@Directive({selector: '[tileLayout]'})
export class TileLayoutDirective implements OnChanges, AfterContentInit, OnInit {
  @Input('tileLayoutConfig') private _config: TileLayoutConfig;
  @Input('tileLayoutColumns') private _columns: Array<TileLayoutConfigColumn> = [];
  @ContentChildren(TileLayoutChildDirective) private _tiles: QueryList<TileLayoutChildDirective>;
  private _nativeElement: HTMLElement;
  private _elementResizeDetector: ElementResizeDetector;
  private _debouncedCalculateLayout: Function;
  private _columnHeights: Array<number>;

  @HostBinding('style.position') private get _position(){return 'relative'};

  @HostBinding('style.minHeight.px')
  private get containerHeight(): number{return Math.max(...this._columnHeights)};

  constructor(
      elementRef: ElementRef,
      @Inject(elementResizeDetectorMaker) elementResizeDetectorMaker: ElementResizeDetectorMaker) {
    this._nativeElement = elementRef.nativeElement;
    this._elementResizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});
    this._debouncedCalculateLayout = debounce(this._calculateLayout, 100, {maxWait: 1000});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_config']) {
      this._config = Object.assign({}, defaultConfig, changes['_config'].currentValue);
    }
  }

  ngOnInit() {
    this._elementResizeDetector.listenTo(this._nativeElement, () => {
      this._debouncedCalculateLayout();
    });
  }

  ngAfterContentInit() {
    this._calculateLayout();

    this._tiles.changes.subscribe(() => {
      this._debouncedCalculateLayout();
    });
  }

  calculateLayout() {
    this._debouncedCalculateLayout();
  }

  private _calculateLayout(): void {
    const width = this._nativeElement.offsetWidth;
    const numberOfColumns = this._getNumberOfColumns(width, this._columns);

    this._positionTiles(this._tiles, width, numberOfColumns);
  }

  private _positionTiles(
      tiles: QueryList<TileLayoutChildDirective>, width: number, numberOfColumns: number): void {
    const columnWidth = this._getColumnWidth(width, numberOfColumns, this._config.padding);

    this._columnHeights =
        tiles.reduce((previousValue: Array<number>, tile: TileLayoutChildDirective) => {
          const smallestColumnIndex = this._getSmallestColumnIndex(previousValue);
          const isTopItem = previousValue[smallestColumnIndex] === 0;

          const topPadding = isTopItem ? 0 : this._config.padding;

          tile.setPosition({
            width: columnWidth,
            left: smallestColumnIndex * columnWidth + smallestColumnIndex * this._config.padding,
            top: previousValue[smallestColumnIndex] + topPadding
          });

          previousValue[smallestColumnIndex] += tile.height + topPadding;

          return previousValue;
        }, new Array(numberOfColumns).fill(0));
  }

  private _getNumberOfColumns(width: number, columns: Array<TileLayoutConfigColumn>): number {
    return columns
        .reduce(
            (previousValue: TileLayoutConfigColumn, column: TileLayoutConfigColumn) => {
              if (width >= column.minWidth && column.minWidth > previousValue.minWidth) {
                return column;
              }

              return previousValue;
            },
            {minWidth: 0, columns: 1})
        .columns;
  }

  private _getSmallestColumnIndex(columns: Array<number>): number {
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

  private _getColumnWidth(width: number, numberOfColumns: number, padding: number): number {
    const totalPadding = padding * (numberOfColumns - 1);
    const widthAfterPadding = width - totalPadding;

    return widthAfterPadding / numberOfColumns;
  }
}
