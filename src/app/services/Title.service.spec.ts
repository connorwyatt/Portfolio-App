import {Title} from '@angular/platform-browser';
import {TITLES} from '../constants/TITLES.constant';
import {TitleMock} from '../mocks/Title.mock';
import {TitleService} from './Title.service';

describe('TitleService', () => {
  let titleService: TitleService, titleMock: TitleMock, TITLES_MOCK: any;

  beforeEach(() => {
    titleMock = new TitleMock();
    TITLES_MOCK = {titles: {'level1.level2.level3.level4.test': 'Test'}, suffix: 'Portfolio'};

    titleService = new TitleService(<Title>titleMock, <typeof TITLES>TITLES_MOCK);
  });

  it('should be defined', () => {
    expect(titleService).toBeDefined();
  });

  describe('Method: resolve', () => {
    describe('when there is a title defined', () => {
      beforeEach(() => {
        titleService.setTitleForState('level1.level2.level3.level4.test');
      });

      it('should set the title to the matching title in the constant', () => {
        expect(titleMock.setTitle).toHaveBeenCalledWith('Test - Portfolio');
      });
    });

    describe('when there is not a title defined', () => {
      it('should throw an error', () => {
        expect(() => {
          titleService.setTitleForState('no-title-defined');
        }).toThrowError(`No title has been defined for the titleKey: 'no-title-defined'`);
      });

      it('should set the title to default title', () => {
        try {
          titleService.setTitleForState('no-title-defined');
        } catch (e) {
        }

        expect(titleMock.setTitle).toHaveBeenCalledWith('Portfolio');
      });
    });
  });
});
