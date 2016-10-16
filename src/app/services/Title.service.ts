import {Inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TITLES_CONSTANT} from '../constants/TITLES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {TITLES_CONSTANT_TOKEN} from '../tokens/TITLES_CONSTANT.token';
import {LoggingService} from './Logging.service';

@Injectable()
export class TitleService {
  private _titleService: Title;
  private _titlesConstant: typeof TITLES_CONSTANT;
  private _loggingService: LoggingService;

  constructor(
      titleService: Title, @Inject(TITLES_CONSTANT_TOKEN) titlesConstant: typeof TITLES_CONSTANT,
      loggingService: LoggingService) {
    this._titleService = titleService;
    this._titlesConstant = titlesConstant;
    this._loggingService = loggingService;
  }

  setTitleForState(titleKey: string): void {
    const title = this._getTitle(titleKey);

    this._titleService.setTitle(title);
  }

  private _getTitle(titleKey: string): string {
    const title = this._titlesConstant.titles[titleKey];

    if (!title) {
      this._loggingService.log(
        [
          {
            type: LoggingMessageTypes.ERROR,
            message: `No title has been defined for the titleKey: '${titleKey}'.`
          },
          {
            type: LoggingMessageTypes.INFO,
            message: `To fix the issue, define a title for the key ('${titleKey
              }') in the TITLES_CONSTANT.`
          }
        ],
        'No Title Defined');

              return this._titlesConstant.suffix;
    }

    return title + ' - ' + this._titlesConstant.suffix;
  }
}
