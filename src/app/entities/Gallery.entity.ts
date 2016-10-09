import { BaseEntity } from './Base.entity';
import { JSONAPIResourceIdentifierObject } from '../interfaces/JSONAPI';

export interface GalleryAttributes {
  name: string;
}

export class Gallery extends BaseEntity {
  attributes: GalleryAttributes;

  constructor(data: JSONAPIResourceIdentifierObject<GalleryAttributes>) {
    super(data);
  }
}
