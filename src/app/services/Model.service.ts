import {Inject, Injectable} from '@angular/core';
import {ENTITIES} from '../constants/ENTITIES.constant';
import {BaseEntity} from '../entities/Base.entity';
import {JSONAPICollectionResponse, JSONAPIModelResponse, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {ENTITIES_TOKEN} from '../tokens/ENTITIES.token';

@Injectable()
export class ModelService {
  private _ENTITIES: typeof ENTITIES;

  constructor(@Inject(ENTITIES_TOKEN) entitiesConstant: typeof ENTITIES) {
    this._ENTITIES = entitiesConstant;
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
      EntityClass = this._ENTITIES.defaultEntity;
    }

    return new EntityClass(resource);
  }
}
