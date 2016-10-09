import { JSONAPIResourceIdentifierObject } from '../interfaces/JSONAPI';

export class BaseEntity {
  attributes: Object;

  constructor(data: JSONAPIResourceIdentifierObject<any>) {
    this.attributes = data.attributes;
  }
}
