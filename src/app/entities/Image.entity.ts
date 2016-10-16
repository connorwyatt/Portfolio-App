import {BehaviorSubject, Observable} from 'rxjs';
import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {BaseEntity} from './Base.entity';

export interface ImageAttributes { name: string; }

export class Image extends BaseEntity {
  attributes: ImageAttributes;

  constructor(data: JSONAPIResourceIdentifierObject<ImageAttributes>) {
    super(data);
  }

  getThumbnailImage(): Observable<string> {
    const link = this.getLink('thumbnailImage');

    return this._getImage(link.href);
  }

  getOriginalImage(): Observable<string> {
    const link = this.getLink('originalImage');

    return this._getImage(link.href);
  }

  private _getImage(url: string): Observable<string> {
    return new BehaviorSubject(null);  // TODO Make request to API and use base64 encoded image
  }
}
