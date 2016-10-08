import { TitleResolveService } from './TitleResolve.service';
import { Title } from '@angular/platform-browser';
import { TitleMock } from '../../mocks/Title.mock';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('TitleResolveService', () => {
  let titleResolveService: TitleResolveService,
    titleMock: TitleMock;

  beforeEach(() => {
    titleMock = new TitleMock();

    titleResolveService = new TitleResolveService(<Title>titleMock);
  });

  it('should be defined', () => {
    expect(titleResolveService).toBeDefined();
  });

  describe('Method: resolve', () => {
    describe('when there is a title defined', () => {
      let result: string;

      beforeEach(() => {
        const route = {
          url: [
            { toString: () => 'galleries' }
          ]
        };

        result = titleResolveService.resolve(<ActivatedRouteSnapshot>route);
      });

      it('should set the title to the matching title in the constant', () => {
        expect(titleMock.setTitle).toHaveBeenCalledWith('Galleries - Portfolio');
      });

      it('should return the titleKey', () => {
        expect(result).toBe('galleries');
      });
    });

    describe('when there is not a title defined', () => {
      let route: {};

      beforeEach(() => {
        route = {
          url: [
            { toString: () => 'no-title-defined' }
          ]
        };
      });

      it('should throw an error', () => {
        expect(() => {
          titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        }).toThrowError(`No title has been defined for the titleKey: 'no-title-defined'`);
      });

      it('should set the title to default title', () => {
        try {
          titleResolveService.resolve(<ActivatedRouteSnapshot>route);
        } catch (e) {}

        expect(titleMock.setTitle).toHaveBeenCalledWith('Portfolio');
      });
    });
  });
});
