import {Inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {get} from 'lodash';
import {TITLES} from '../constants/TITLES.constant';
import {TITLES_TOKEN} from '../tokens/TITLES.token';

@Injectable()
export class TitleService {
  private _titleService: Title;
  private _titlesConstant: typeof TITLES;

  constructor(titleService: Title, @Inject(TITLES_TOKEN) titlesConstant: typeof TITLES) {
    this._titleService = titleService;
    this._titlesConstant = titlesConstant;
  }

  setTitleForState(titleKey: string): void {
    const title = this._getTitle(titleKey);

    this._titleService.setTitle(title);
  }

  private _getTitle(titleKey: string): string {
    const title = this._titlesConstant.titles[titleKey];

    if (!title) {
      this._resetTitle();
      throw new Error(`No title has been defined for the titleKey: '${titleKey}'`);
    }

    return title + ' - ' + this._titlesConstant.suffix;
  }

  private _resetTitle(): void {
    this._titleService.setTitle(this._titlesConstant.suffix);
  }
}
