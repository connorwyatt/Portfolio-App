import {ENTITIES} from '../constants/ENTITIES.constant';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {JSONAPICollectionResponse, JSONAPIModelResponse, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {LoggingService} from './Logging.service';
import {ModelService} from './Model.service';
import Spy = jasmine.Spy;

describe('ModelService', () => {
  let modelService: ModelService, entitiesConstant: any, loggingServiceMock: any,
      defaultEntityConstructorSpy: Spy, testEntityConstructorSpy: Spy,
      testEntity2ConstructorSpy: Spy;

  beforeEach(() => {
    defaultEntityConstructorSpy = jasmine.createSpy('defaultEntityConstructor');
    testEntityConstructorSpy = jasmine.createSpy('testEntityConstructor');
    testEntity2ConstructorSpy = jasmine.createSpy('testEntity2Constructor');

    entitiesConstant = {
      defaultEntity: class DefaultEntity{
        constructor(data: JSONAPIResourceIdentifierObject<any>) {
          defaultEntityConstructorSpy(data);
        }
      },
      testEntity: class TestEntity{
        constructor(data: JSONAPIResourceIdentifierObject<any>) {
          testEntityConstructorSpy(data);
        }
      },
      testEntity2: class TestEntity2{
        constructor(data: JSONAPIResourceIdentifierObject<any>) {
          testEntity2ConstructorSpy(data);
        }
      }
    };

    loggingServiceMock = {log: jasmine.createSpy('log')};

    modelService =
        new ModelService(<typeof ENTITIES>entitiesConstant, <LoggingService>loggingServiceMock);
  });

  describe('Method: createModelFromJSONAPI', () => {
    describe('when the entity does exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: {type: 'testEntity'}};

        result = modelService.createModelFromJSONAPI(<JSONAPIModelResponse<Object>>response);
      });

      it('should create a new instance of the entity', () => {
        expect(testEntityConstructorSpy).toHaveBeenCalledWith(response.data);
      });

      it('should return the new entity', () => {
        expect(result).toEqual(jasmine.any(entitiesConstant.testEntity));
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

      it('should create a new instance of the defaultEntity', () => {
        expect(defaultEntityConstructorSpy).toHaveBeenCalledWith(response.data);
      });

      it('should return the new entity', () => {
        expect(result).toEqual(jasmine.any(entitiesConstant.defaultEntity));
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

      it('should create new instances of the entities', () => {
        expect(testEntityConstructorSpy).toHaveBeenCalledWith(response.data[0]);
        expect(testEntity2ConstructorSpy).toHaveBeenCalledWith(response.data[1]);
      });

      it('should return an array with the new entities', () => {
        expect(result).toEqual(
            [jasmine.any(entitiesConstant.testEntity), jasmine.any(entitiesConstant.testEntity2)]);
      });
    });

    describe('when the entities do not exist', () => {
      let response: any, result: any;

      beforeEach(() => {
        response = {data: [{type: 'entityDoesNotExist'}, {type: 'entityDoesNotExist2'}]};

        result =
            modelService.createCollectionFromJSONAPI(<JSONAPICollectionResponse<Object>>response);
      });

      it('should create new instances of the defaultEntity', () => {
        expect(defaultEntityConstructorSpy).toHaveBeenCalledWith(response.data[0]);
        expect(defaultEntityConstructorSpy).toHaveBeenCalledWith(response.data[1]);
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
        expect(result).toEqual([
          jasmine.any(entitiesConstant.defaultEntity), jasmine.any(entitiesConstant.defaultEntity)
        ]);
      });
    });
  });
});
