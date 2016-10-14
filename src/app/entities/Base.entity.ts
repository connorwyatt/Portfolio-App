import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';

export class BaseEntity {
  get id(): string { return this._id; }

  attributes: Object;

  private _id: string;

  constructor(data: JSONAPIResourceIdentifierObject<any>) {
    this._id = data.id;
    this.attributes = data.attributes;
  }
}
