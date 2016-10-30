import {Inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TITLES_CONSTANT} from '../constants/TITLES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {TITLES_CONSTANT_TOKEN} from '../tokens/TITLES_CONSTANT.token';
import {CwLoggingService} from './CwLogging.service';

@Injectable()
export class CwTitleService {
  constructor(
      private titleService: Title,
      @Inject(TITLES_CONSTANT_TOKEN) private titlesConstant: typeof TITLES_CONSTANT,
      private loggingService: CwLoggingService) {
    this.titleService = titleService;
    this.titlesConstant = titlesConstant;
    this.loggingService = loggingService;
  }

  public setTitleForState(titleKey: string): void {
    const title = this._getTitle(titleKey);

    this.titleService.setTitle(title);
  }

  private _getTitle(titleKey: string): string {
    const title = this.titlesConstant.titles[titleKey];

    if (!title) {
      this.loggingService.log(
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

              return this.titlesConstant.suffix;
    }

    return title + ' - ' + this.titlesConstant.suffix;
  }
}
