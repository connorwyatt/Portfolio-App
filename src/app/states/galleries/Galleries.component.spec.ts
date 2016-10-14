import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {GalleriesComponent} from './Galleries.component';

describe('GalleriesComponent', () => {
  let galleries: GalleriesComponent, route: {data: Observable<{}>},
      routeDataObservable: Subject<{}>;

  beforeEach(() => {
    routeDataObservable = new Subject<{}>();

    route = {data: routeDataObservable};

    galleries = new GalleriesComponent(<ActivatedRoute>route);
  });

  it('should be defined', () => {
    expect(galleries).toBeDefined();
  });

  describe('when the route data resolves', () => {
    beforeEach(() => {
      routeDataObservable.next({galleries: 'galleries'});
    });

    it('should set the galleries', () => {
      expect(galleries.galleries).toBe('galleries');
    });
  });
});
