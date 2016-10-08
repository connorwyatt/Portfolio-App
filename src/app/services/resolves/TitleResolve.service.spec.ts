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
});
