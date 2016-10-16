import {Injectable} from '@angular/core';
import {BaseEntity} from './Base.entity';

export interface GalleryAttributes { name: string; }

@Injectable()
export class Gallery extends BaseEntity {
  attributes: GalleryAttributes;
}
