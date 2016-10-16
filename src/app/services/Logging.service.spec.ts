import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {EnvService} from './Env.service';
import {LoggingService} from './Logging.service';

describe('LoggingService', () => {
  let loggingService: LoggingService, envServiceMock: any, consoleMock: any,
      callOrder: Array<string>;

  beforeEach(() => {
    callOrder = [];

    consoleMock = {
      log: jasmine.createSpy('log').and.callFake(() => callOrder.push('log')),
      info: jasmine.createSpy('info').and.callFake(() => callOrder.push('info')),
      warn: jasmine.createSpy('warn').and.callFake(() => callOrder.push('warn')),
      error: jasmine.createSpy('error').and.callFake(() => callOrder.push('error')),
      group: jasmine.createSpy('group').and.callFake(() => callOrder.push('group')),
      groupEnd: jasmine.createSpy('groupEnd').and.callFake(() => callOrder.push('groupEnd'))
    };
  });

  describe('when development', () => {
    beforeEach(() => {
      envServiceMock = {isDevelopment: true};

      loggingService = new LoggingService(<EnvService>envServiceMock, <Console>consoleMock);
    });

    describe('Method: log', () => {
      describe('when groupTitle is set', () => {
        beforeEach(() => {
          loggingService.log(
              [
                {type: LoggingMessageTypes.LOG, message: 'LOG'},
                {type: LoggingMessageTypes.INFO, message: 'INFO'},
                {type: LoggingMessageTypes.WARN, message: 'WARN'},
                {type: LoggingMessageTypes.ERROR, message: 'ERROR'}
              ],
              'Title');
        });

        it('should create a group', () => {
          expect(consoleMock.group).toHaveBeenCalledWith('Title');
        });

        it('should output each message', () => {
          expect(consoleMock.log).toHaveBeenCalledWith('LOG');
          expect(consoleMock.info).toHaveBeenCalledWith('INFO');
          expect(consoleMock.warn).toHaveBeenCalledWith('WARN');
          expect(consoleMock.error).toHaveBeenCalledWith('ERROR');
        });

        it('should end the group', () => {
          expect(consoleMock.groupEnd).toHaveBeenCalledWith();
        });

        it('should call them in the correct order', () => {
          expect(callOrder).toEqual(['group', 'log', 'info', 'warn', 'error', 'groupEnd']);
        });
      });

      describe('when groupTitle is not set', () => {
        beforeEach(() => {
          loggingService.log([
            {type: LoggingMessageTypes.LOG, message: 'LOG'},
            {type: LoggingMessageTypes.INFO, message: 'INFO'},
            {type: LoggingMessageTypes.WARN, message: 'WARN'},
            {type: LoggingMessageTypes.ERROR, message: 'ERROR'}
          ]);
        });

        it('should not create a group', () => {
          expect(consoleMock.group).not.toHaveBeenCalled();
        });

        it('should output each message', () => {
          expect(consoleMock.log).toHaveBeenCalledWith('LOG');
          expect(consoleMock.info).toHaveBeenCalledWith('INFO');
          expect(consoleMock.warn).toHaveBeenCalledWith('WARN');
          expect(consoleMock.error).toHaveBeenCalledWith('ERROR');
        });

        it('should not end the group', () => {
          expect(consoleMock.groupEnd).not.toHaveBeenCalled();
        });

        it('should call them in the correct order', () => {
          expect(callOrder).toEqual(['log', 'info', 'warn', 'error']);
        });
      });
    });
  });

  describe('when not development', () => {
    beforeEach(() => {
      envServiceMock = {isDevelopment: false};

      loggingService = new LoggingService(<EnvService>envServiceMock, <Console>consoleMock);
    });

    describe('Method: log', () => {
      beforeEach(() => {
        loggingService.log(
            [
              {type: LoggingMessageTypes.LOG, message: 'LOG'},
              {type: LoggingMessageTypes.INFO, message: 'INFO'},
              {type: LoggingMessageTypes.WARN, message: 'WARN'},
              {type: LoggingMessageTypes.ERROR, message: 'ERROR'}
            ],
            'Title');
      });

      it('should not create a group', () => {
        expect(consoleMock.group).not.toHaveBeenCalled();
      });

      it('should not output any messages', () => {
        expect(consoleMock.log).not.toHaveBeenCalled();
        expect(consoleMock.info).not.toHaveBeenCalled();
        expect(consoleMock.warn).not.toHaveBeenCalled();
        expect(consoleMock.error).not.toHaveBeenCalled();
      });

      it('should not end the group', () => {
        expect(consoleMock.groupEnd).not.toHaveBeenCalled();
      });
    });
  });
});
