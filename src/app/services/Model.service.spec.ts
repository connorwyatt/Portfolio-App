import {Injector} from '@angular/core';
import {ENTITIES_CONSTANT} from '../constants/ENTITIES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {JSONAPICollectionResponse, JSONAPIModelResponse} from '../interfaces/JSONAPI';
import {LoggingService} from './Logging.service';
import {ModelService} from './Model.service';
import Spy = jasmine.Spy;

describe('ModelService', () => {
  let modelService: ModelService, entityMock: any, injectorMock: any, entitiesConstant: any,
      loggingServiceMock: any;

  beforeEach(() => {
    entityMock = {initialise: jasmine.createSpy('initialise')};

    injectorMock = {get: jasmine.createSpy('get').and.returnValue(entityMock)};

    entitiesConstant = {
      defaultEntity: 'defaultEntity',
      testEntity: 'testEntity',
      testEntity2: 'testEntity2'
    };

    loggingServiceMock = {log: jasmine.createSpy('log')};

    modelService = new ModelService(
        <Injector>injectorMock, <typeof ENTITIES_CONSTANT>entitiesConstant,
        <LoggingService>loggingServiceMock);
  });

  describe('Method: createModelFromJSONAPI', () => {
    describe('when the entity does exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: {type: 'testEntity'}};

        result = modelService.createModelFromJSONAPI(<JSONAPIModelResponse<Object>>response);
      });

      it('should get the specified entity from the injector', () => {
        expect(injectorMock.get).toHaveBeenCalledWith('testEntity');
      });

      it('should initialise the entity with the response data', () => {
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data);
      });

      it('should return the new entity', () => {
        expect(result).toEqual(entityMock);
      });
    });

    describe('when the entity does not exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: {type: 'entityDoesNotExist'}};

        result = modelService.createModelFromJSONAPI(<JSONAPIModelResponse<Object>>response);
      });

      it('should log a warning and information about how to fix it', () => {
        expect(loggingServiceMock.log)
            .toHaveBeenCalledWith(
                [
                  {
                    type: LoggingMessageTypes.WARN,
                    message: `No entity defined for 'entityDoesNotExist', using BaseEntity.`
                  },
                  {
                    type: LoggingMessageTypes.INFO,
                    message:
                        `To use a custom entity, make sure it is defined for this type ('entityDoesNotExist') in the ENTITIES_CONSTANT.`
                  }
                ],
                'No Entity Defined');
      });

      it('should get the default entity from the injector', () => {
        expect(injectorMock.get).toHaveBeenCalledWith('defaultEntity');
      });

      it('should initialise the entity with the response data', () => {
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data);
      });

      it('should return the new entity', () => {
        expect(result).toEqual(entityMock);
      });
    });
  });

  describe('Method: createCollectionFromJSONAPI', () => {
    describe('when the entities do exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: [{type: 'testEntity'}, {type: 'testEntity2'}]};

        result =
            modelService.createCollectionFromJSONAPI(<JSONAPICollectionResponse<Object>>response);
      });

      it('should get the specified entities from the injector', () => {
        expect(injectorMock.get).toHaveBeenCalledWith('testEntity');
        expect(injectorMock.get).toHaveBeenCalledWith('testEntity2');
      });

      it('should initialise the entity with the response data', () => {
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data[0]);
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data[1]);
      });

      it('should return an array with the new entities', () => {
        expect(result).toEqual([entityMock, entityMock]);
      });
    });

    describe('when the entities do not exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: [{type: 'entityDoesNotExist'}, {type: 'entityDoesNotExist2'}]};

        result =
            modelService.createCollectionFromJSONAPI(<JSONAPICollectionResponse<Object>>response);
      });

      it('should get the default entity from the injector', () => {
        expect(injectorMock.get).toHaveBeenCalledWith('defaultEntity');
        expect(injectorMock.get).toHaveBeenCalledTimes(2);
      });

      it('should initialise the entity with the response data', () => {
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data[0]);
        expect(entityMock.initialise).toHaveBeenCalledWith(response.data[1]);
      });

      it('should log two warnings and information about how to fix them', () => {
        expect(loggingServiceMock.log)
            .toHaveBeenCalledWith(
                [
                  {
                    type: LoggingMessageTypes.WARN,
                    message: `No entity defined for 'entityDoesNotExist', using BaseEntity.`
                  },
                  {
                    type: LoggingMessageTypes.INFO,
                    message:
                        `To use a custom entity, make sure it is defined for this type ('entityDoesNotExist') in the ENTITIES_CONSTANT.`
                  }
                ],
                'No Entity Defined');

        expect(loggingServiceMock.log)
            .toHaveBeenCalledWith(
                [
                  {
                    type: LoggingMessageTypes.WARN,
                    message: `No entity defined for 'entityDoesNotExist2', using BaseEntity.`
                  },
                  {
                    type: LoggingMessageTypes.INFO,
                    message:
                        `To use a custom entity, make sure it is defined for this type ('entityDoesNotExist2') in the ENTITIES_CONSTANT.`
                  }
                ],
                'No Entity Defined');
      });

      it('should return an array of the new entities', () => {
        expect(result).toEqual([entityMock, entityMock]);
      });
    });
  });
});
