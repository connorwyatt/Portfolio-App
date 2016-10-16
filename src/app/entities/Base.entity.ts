import {JSONAPILink, JSONAPILinksObject, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';

export class BaseEntity {
  get id(): string {
    return this._id;
  }

  attributes: Object;

  private _id: string;
  private _links: JSONAPILinksObject;

  constructor(data: JSONAPIResourceIdentifierObject<any>) {
    this._id = data.id;
    this.attributes = data.attributes;
    this._links = data.links;
  }

  getLink(linkName: string): JSONAPILink {
    return this._links[linkName];
  }
}
