import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TITLES } from '../../constants/TITLES.constant';
import { TitleMock } from '../../mocks/Title.mock';
import { TitleResolveService } from './TitleResolve.service';

describe('TitleResolveService', () => {
  let titleResolveService: TitleResolveService, titleMock: TitleMock, TITLES_MOCK: any;

  beforeEach(() => {
    titleMock = new TitleMock();
    TITLES_MOCK = {
      titles: { 'home': 'Home', 'level1.level2.level3.level4.test': 'Test' },
      suffix: 'Portfolio'
    };

    titleResolveService = new TitleResolveService(<Title>titleMock, <typeof TITLES>TITLES_MOCK);
  });

  it('should be defined', () => {
    expect(titleResolveService).toBeDefined();
  });

  describe('Method: resolve', () => {
    describe('when there is a title defined', () => {
      describe('when the path has one part', () => {
        let result: string;

        beforeEach(() => {
          const route: {} = { pathFromRoot: [{ routeConfig: { path: 'home' } }] };

          result = titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        });

        it('should set the title to the matching title in the constant', () => {
          expect(titleMock.setTitle).toHaveBeenCalledWith('Home - Portfolio');
        });

        it('should return the titleKey', () => {
          expect(result).toBe('home');
        });
      });

      describe('when the path has more than one part', () => {
        let result: string;

        beforeEach(() => {
          const route = {
            pathFromRoot: [
              { routeConfig: { path: 'level1' } }, { routeConfig: { path: 'level2' } },
              { routeConfig: { path: 'level3' } }, { routeConfig: { path: 'level4' } },
              { routeConfig: { path: null } }, {}, { routeConfig: { path: 'test' } }
            ]
          };

          result = titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        });

        it('should set the title to the matching title in the constant', () => {
          expect(titleMock.setTitle).toHaveBeenCalledWith('Test - Portfolio');
        });

        it('should return the titleKey', () => {
          expect(result).toBe('level1.level2.level3.level4.test');
        });
      });
    });

    describe('when there is not a title defined', () => {
      let route: {};

      beforeEach(() => {
        route = { pathFromRoot: [{ routeConfig: { path: 'no-title-defined' } }] };
      });

      it('should throw an error', () => {
        expect(() => {
          titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        }).toThrowError(`No title has been defined for the titleKey: 'no-title-defined'`);
      });

      it('should set the title to default title', () => {
        try {
          titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        } catch (e) {
        }

        expect(titleMock.setTitle).toHaveBeenCalledWith('Portfolio');
      });
    });
  });
});
