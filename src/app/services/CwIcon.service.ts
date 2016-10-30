import {Injectable} from '@angular/core';
import {Http, Response, ResponseContentType} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class CwIconService {
  private cache: Map<string, BehaviorSubject<SVGElement>>;
  private basePath = '/assets/icons/';
  private extension = '.svg';

  constructor(private http: Http) {
    this.cache = new Map<string, BehaviorSubject<SVGElement>>();
  }

  public getIcon(iconName: string): Observable<SVGElement> {
    if (this.cache.has(iconName)) {
      return this.cache.get(iconName);
    }

    const iconSubject = new BehaviorSubject<SVGElement>(null);
    const iconUrl = this.basePath + iconName + this.extension;

    this.http.get(iconUrl, {responseType: ResponseContentType.Text})
        .subscribe((response: Response) => {
          const svgElement = this.svgElementFromString(response.text());

          iconSubject.next(svgElement);
        });

    this.cache.set(iconName, iconSubject);

    return iconSubject;
  }

  private svgElementFromString(svgString: string): SVGElement {
    const div = document.createElement('div');
    div.innerHTML = svgString;
    return div.querySelector('svg') as SVGElement;
  }
}
