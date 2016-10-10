import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Resolve,
  ActivatedRouteSnapshot,
  UrlSegment
} from '@angular/router';
import { TITLES } from '../../constants/TITLES.constant';
import { TITLE_SUFFIX } from '../../constants/TITLE_SUFFIX.constant';

@Injectable()
export class TitleResolveService implements Resolve<any> {
  private _titleService: Title;

  constructor(titleService: Title) { // TODO: Inject TITLES and TITLE_SUFFIX into constructor
    this._titleService = titleService
  }

  resolve(route: ActivatedRouteSnapshot): string {
    const urlSegments: string[] = route.url.map((urlSegment: UrlSegment) => {
      return urlSegment.toString();
    });

    const titleKey = urlSegments.join('.');

    const title = this._getTitle(titleKey);

    this._titleService.setTitle(title);

    return titleKey;
  }

  private _getTitle(titleKey: string): string {
    const title = TITLES[titleKey];

    if (!title) {
      this._resetTitle();
      throw new Error(`No title has been defined for the titleKey: '${titleKey}'`);
    }

    return title + ' - ' + TITLE_SUFFIX;
  }

  private _resetTitle(): void {
    this._titleService.setTitle(TITLE_SUFFIX);
  }
}
