import {Inject, Injectable} from '@angular/core';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {IConsole} from '../interfaces/IConsole';
import {ILoggingMessage} from '../interfaces/ILoggingMessage';
import {CONSOLE_TOKEN} from '../tokens/CONSOLE.token';
import {EnvService} from './Env.service';

@Injectable()
export class LoggingService {
  private _shouldLog: boolean;
  private _console: IConsole;

  constructor(envService: EnvService, @Inject(CONSOLE_TOKEN) console: IConsole) {
    this._shouldLog = envService.isDevelopment;
    this._console = console;
  }

  log(messages: Array<ILoggingMessage>, groupTitle?: string): void {
    if (this._shouldLog) {
      if (groupTitle) {
        this._wrapIntoGroup(groupTitle, () => {
          this._logMessages(messages);
        });
      } else {
        this._logMessages(messages);
      }
    }
  }

  private _logMessages(messages: Array<ILoggingMessage>): void {
    messages.forEach((message) => {
      const loggingMethod = this._getLoggingMethod(message.type);

      loggingMethod(message.message);
    });
  }

  private _wrapIntoGroup(groupTitle: string, log: () => void): void {
    this._console.group(groupTitle);
    log();
    this._console.groupEnd();
  }

  private _getLoggingMethod(type: LoggingMessageTypes): Function {
    switch (type) {
      case (LoggingMessageTypes.LOG):
        return this._console.log;
      case (LoggingMessageTypes.INFO):
        return this._console.info;
      case (LoggingMessageTypes.WARN):
        return this._console.warn;
      case (LoggingMessageTypes.ERROR):
        return this._console.error;
    }
  }
}
