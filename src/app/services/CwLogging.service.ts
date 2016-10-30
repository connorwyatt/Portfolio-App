import {Inject, Injectable} from '@angular/core';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {IConsole} from '../interfaces/IConsole';
import {ILoggingMessage} from '../interfaces/ILoggingMessage';
import {CONSOLE_TOKEN} from '../tokens/CONSOLE.token';
import {CwEnvService} from './CwEnv.service';

@Injectable()
export class CwLoggingService {
  constructor(private envService: CwEnvService, @Inject(CONSOLE_TOKEN) private console: IConsole) {}

  public log(messages: Array<ILoggingMessage>, groupTitle?: string): void {
    if (this.envService.isDevelopment) {
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
    this.console.group(groupTitle);
    log();
    this.console.groupEnd();
  }

  private _getLoggingMethod(type: LoggingMessageTypes): Function {
    switch (type) {
      case (LoggingMessageTypes.LOG):
        return this.console.log;
      case (LoggingMessageTypes.INFO):
        return this.console.info;
      case (LoggingMessageTypes.WARN):
        return this.console.warn;
      case (LoggingMessageTypes.ERROR):
        return this.console.error;
    }
  }
}
