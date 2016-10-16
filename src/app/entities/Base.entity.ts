import {keys} from 'lodash';
import {JSONAPILink, JSONAPILinkObject, JSONAPILinksObject, JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';

export class BaseEntity {
  get id(): string {
    return this._id;
  }

  attributes: Object;

  private _id: string;
  private _links: {[key: string]: JSONAPILinkObject};

  constructor(data: JSONAPIResourceIdentifierObject<any>) {
    this._id = data.id;
    this.attributes = data.attributes;
    this._links = this._parseLinks(data.links);
  }

  getLink(linkName: string): JSONAPILinkObject {
    return this._links[linkName];
  }

  private _parseLinks(links: JSONAPILinksObject): {[key: string]: JSONAPILinkObject} {
    const parsedLinks: {[key: string]: JSONAPILinkObject} = {};
    const linkKeys: Array<string> = keys(links);

    linkKeys.forEach((linkKey) => {
      const link: JSONAPILink = links[linkKey];
      let parsedLink: JSONAPILinkObject;

      if (typeof link === 'string') {
        parsedLink = {href: link};
      } else {
        parsedLink = link;
      }

      parsedLinks[linkKey] = parsedLink;
    });

    return parsedLinks
  }
}
