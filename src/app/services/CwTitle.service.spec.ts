import {Title} from '@angular/platform-browser';
import {TITLES_CONSTANT} from '../constants/TITLES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {TitleMock} from '../mocks/Title.mock';
import {CwLoggingService} from './CwLogging.service';
import {CwTitleService} from './CwTitle.service';

describe('CwTitleService', () => {
  let titleService: CwTitleService;
  let titleMock: TitleMock;
  let TITLES_MOCK: any;
  let loggingServiceMock: any;

  beforeEach(() => {
    titleMock = new TitleMock();
    TITLES_MOCK = {titles: {'level1.level2.level3.level4.test': 'Test'}, suffix: 'Portfolio'};
    loggingServiceMock = {log: jasmine.createSpy('log')};

    titleService = new CwTitleService(
        titleMock as Title, TITLES_MOCK as typeof TITLES_CONSTANT,
        loggingServiceMock as CwLoggingService);
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
