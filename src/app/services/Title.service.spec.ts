import {Title} from '@angular/platform-browser';
import {TITLES} from '../constants/TITLES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {TitleMock} from '../mocks/Title.mock';
import {LoggingService} from './Logging.service';
import {TitleService} from './Title.service';

describe('TitleService', () => {
  let titleService: TitleService, titleMock: TitleMock, TITLES_MOCK: any, loggingServiceMock: any;

  beforeEach(() => {
    titleMock = new TitleMock();
    TITLES_MOCK = {titles: {'level1.level2.level3.level4.test': 'Test'}, suffix: 'Portfolio'};
    loggingServiceMock = {log: jasmine.createSpy('log')};

    titleService = new TitleService(
        <Title>titleMock, <typeof TITLES>TITLES_MOCK, <LoggingService>loggingServiceMock);
  });

  it('should be defined', () => {
    expect(titleService).toBeDefined();
  });

  describe('Method: setTitleForState', () => {
    describe('when there is a title defined', () => {
      beforeEach(() => {
        titleService.setTitleForState('level1.level2.level3.level4.test');
      });

      it('should set the title to the matching title in the constant', () => {
        expect(titleMock.setTitle).toHaveBeenCalledWith('Test - Portfolio');
      });
    });

    describe('when there is not a title defined', () => {
      beforeEach(() => {
        titleService.setTitleForState('no-title-defined');
      });

      it('should log an error and information about how to fix the error', () => {
        expect(loggingServiceMock.log)
            .toHaveBeenCalledWith(
                [
                  {
                    type: LoggingMessageTypes.ERROR,
                    message: `No title has been defined for the titleKey: 'no-title-defined'.`
                  },
                  {
                    type: LoggingMessageTypes.INFO,
                    message:
                        `To fix the issue, define a title for the key ('no-title-defined') in the TITLES_CONSTANT.`
                  }
                ],
                'No Title Defined');
      });

      it('should set the title to default title', () => {
        expect(titleMock.setTitle).toHaveBeenCalledWith('Portfolio');
      });
    });
  });
});
