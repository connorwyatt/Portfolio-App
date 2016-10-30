import {Inject, Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {ENTITIES_CONSTANT} from '../constants/ENTITIES.constant';
import {BaseEntity} from '../entities';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {JSONAPICollectionResponse, JSONAPIModelResponse, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {ENTITIES_CONSTANT_TOKEN} from '../tokens/ENTITIES_CONSTANT.token';
import {REFLECTIVE_INJECTOR_TOKEN} from '../tokens/REFLECTIVE_INJECTOR.token';
import {CwLoggingService} from './CwLogging.service';

@Injectable()
export class CwModelService {
  constructor(
      private injector: Injector,
      @Inject(REFLECTIVE_INJECTOR_TOKEN) private reflectiveInjector: typeof ReflectiveInjector,
      @Inject(ENTITIES_CONSTANT_TOKEN) private EntitiesConstant: typeof ENTITIES_CONSTANT,
      private loggingService: CwLoggingService) {}

  public createModelFromJSONAPI(response: JSONAPIModelResponse<Object>): BaseEntity {
    const resource = response.data;

    return this._getEntity(resource);
  }

  public createCollectionFromJSONAPI(response: JSONAPICollectionResponse<Object>): BaseEntity[] {
    return response.data.map((resource) => {
      return this._getEntity(resource);
    });
  }

  private _getEntity(resource: JSONAPIResourceIdentifierObject<Object>): BaseEntity {
    const type: string = resource.type;
    let EntityToken: typeof BaseEntity = this.EntitiesConstant[type];

    if (!EntityToken) {
      this.loggingService.log(
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

              EntityToken = this.EntitiesConstant.defaultEntity;
    }

    const injector = this.reflectiveInjector.resolveAndCreate([EntityToken], this.injector);

    const entity = injector.resolveAndInstantiate(EntityToken) as BaseEntity;
    entity.initialise(resource);

    return entity;
  }
}
