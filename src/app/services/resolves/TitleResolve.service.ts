import {
  Injectable,
  Inject
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { TITLES } from '../../constants/TITLES.constant';
import { TITLES_TOKEN } from '../../tokens/TITLES.token';

@Injectable()
export class TitleResolveService implements Resolve<any> {
  private _titleService: Title;
  private _titlesConstant: typeof TITLES;

  constructor(titleService: Title,
              @Inject(TITLES_TOKEN) titlesConstant: typeof TITLES) {
    this._titleService = titleService;
    this._titlesConstant = titlesConstant;
  }

  resolve(route: ActivatedRouteSnapshot): string {
    const urlSegments = this._getUrlSegments(route);

    const titleKey = urlSegments.join('.');

    const title = this._getTitle(titleKey);

    this._titleService.setTitle(title);

    return titleKey;
  }

  private _getUrlSegments(route: ActivatedRouteSnapshot): Array<string> {
    const pathFromRoot = <Array<ActivatedRouteSnapshot>>route.pathFromRoot;

    return pathFromRoot.reduce((accumulatedValue, routeSegment) => {
      if (routeSegment.routeConfig && routeSegment.routeConfig.path) {
        accumulatedValue.push(routeSegment.routeConfig.path);
      }

      return accumulatedValue;
    }, []);
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
