import {Injectable} from '@angular/core';
import {keys} from 'lodash';
import {IJSONAPILink, IJSONAPILinkObject, IJSONAPILinksObject, IJSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';

@Injectable()
export class BaseEntity {
  get id(): string {
    return this._id;
  }

  attributes: Object;

  private _id: string;
  private _links: {[key: string]: IJSONAPILinkObject};

  initialise(data: IJSONAPIResourceIdentifierObject<Object>): void {
    this._id = data.id;
    this.attributes = data.attributes;
    this._links = this._parseLinks(data.links);
  }

  getLink(linkName: string): IJSONAPILinkObject {
    return this._links[linkName];
  }

  private _parseLinks(links: IJSONAPILinksObject): {[key: string]: IJSONAPILinkObject} {
    const parsedLinks: {[key: string]: IJSONAPILinkObject} = {};
    const linkKeys: Array<string> = keys(links);

    linkKeys.forEach((linkKey) => {
      const link: IJSONAPILink = links[linkKey];
      let parsedLink: IJSONAPILinkObject;

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
