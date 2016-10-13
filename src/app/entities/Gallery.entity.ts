import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {BaseEntity} from './Base.entity';

export interface GalleryAttributes { name: string; }

export class Gallery extends BaseEntity {
  attributes: GalleryAttributes;

  constructor(data: JSONAPIResourceIdentifierObject<GalleryAttributes>) {
    super(data);
  }
}
