import {Inject, Injectable} from '@angular/core';
import {ENTITIES_CONSTANT} from '../constants/ENTITIES.constant';
import {BaseEntity} from '../entities/Base.entity';
import {LoggingMessageTypes} from '../enums/LoggingMessageTypes';
import {JSONAPICollectionResponse, JSONAPIModelResponse, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {ENTITIES_CONSTANT_TOKEN} from '../tokens/ENTITIES_CONSTANT.token';
import {LoggingService} from './Logging.service';

@Injectable()
export class ModelService {
  private _ENTITIES: typeof ENTITIES_CONSTANT;
  private _loggingService: LoggingService;

  constructor(
      @Inject(ENTITIES_CONSTANT_TOKEN) entitiesConstant: typeof ENTITIES_CONSTANT,
      loggingService: LoggingService) {
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
    let EntityClass: typeof BaseEntity = this._ENTITIES[type];

    if (!EntityClass) {
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
              EntityClass = this._ENTITIES.defaultEntity;
    }

    return new EntityClass(resource);
  }
}
