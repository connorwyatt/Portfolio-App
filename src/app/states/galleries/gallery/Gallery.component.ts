import {Component, Inject} from '@angular/core';
import {BaseEntity} from '../../../entities/Base.entity';
import {Gallery} from '../../../entities/Gallery.entity';

@Component(
    {template: require('./Gallery.component.html'), styles: [require('./Gallery.component.scss')]})
export class GalleryComponent {
  get gallery(): Gallery {
    return this._gallery;
  }

  get images(): Array<BaseEntity> {
    return this._images;
  }

  private _gallery: Gallery;
  private _images: Array<BaseEntity>;

  constructor(@Inject('gallery') gallery: Gallery, @Inject('images') images: Array<BaseEntity>) {
    this._gallery = gallery;
    this._images = images;
  }
}
