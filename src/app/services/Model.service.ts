import {Inject, Injectable, Injector, ReflectiveInjector} from '@angular/core';

import {ENTITIES_CONSTANT} from '../constants/ENTITIES.constant';
import {BaseEntity} from '../entities';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {JSONAPICollectionResponse, JSONAPIModelResponse, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {ENTITIES_CONSTANT_TOKEN} from '../tokens/ENTITIES_CONSTANT.token';
import {REFLECTIVE_INJECTOR_TOKEN} from '../tokens/REFLECTIVE_INJECTOR.token';

import {LoggingService} from './Logging.service';

@Injectable()
export class ModelService {
  private _injector: Injector;
  private _ReflectiveInjector: typeof ReflectiveInjector;
  private _ENTITIES: typeof ENTITIES_CONSTANT;
  private _loggingService: LoggingService;

  constructor(
      injector: Injector,
      @Inject(REFLECTIVE_INJECTOR_TOKEN) reflectiveInjector: typeof ReflectiveInjector,
      @Inject(ENTITIES_CONSTANT_TOKEN) entitiesConstant: typeof ENTITIES_CONSTANT,
      loggingService: LoggingService) {
    this._injector = injector;
    this._ReflectiveInjector = reflectiveInjector;
    this._ENTITIES = entitiesConstant;
    this._loggingService = loggingService;
  }

  createModelFromJSONAPI(response: JSONAPIModelResponse<Object>): BaseEntity {
    const resource = response.data;

    return this._getEntity(resource);
  }

  createCollectionFromJSONAPI(response: JSONAPICollectionResponse<Object>): BaseEntity[] {
    return response.data.map((resource) => {
      return this._getEntity(resource);
    });
  }

  private _getEntity(resource: JSONAPIResourceIdentifierObject<Object>): BaseEntity {
    const type: string = resource.type;
    let EntityToken: typeof BaseEntity = this._ENTITIES[type];

    if (!EntityToken) {
      this._loggingService.log(
        [
          {
            type: LoggingMessageTypes.WARN,
            message: `No entity defined for '${type}', using BaseEntity.`
          },
          {
            type: LoggingMessageTypes.INFO,
            message: `To use a custom entity, make sure it is defined for this type ('${type
              }') in the ENTITIES_CONSTANT.`
          }
        ],
        'No Entity Defined');

              EntityToken = this._ENTITIES.defaultEntity;
    }

    const injector = this._ReflectiveInjector.resolveAndCreate([EntityToken], this._injector);

    const entity = <BaseEntity>injector.resolveAndInstantiate(EntityToken);
    entity.initialise(resource);

    return entity;
  }
}
