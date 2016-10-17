import {Component, Inject} from '@angular/core';
import {Gallery, Image} from '../../../entities';

@Component(
    {template: require('./Gallery.component.html'), styles: [require('./Gallery.component.scss')]})
export class GalleryComponent {
  get gallery(): Gallery {
    return this._gallery;
  }

  get images(): Array<Image> {
    return this._images;
  }

  private _gallery: Gallery;
  private _images: Array<Image>;

  constructor(@Inject('gallery') gallery: Gallery, @Inject('images') images: Array<Image>) {
    this._gallery = gallery;
    this._images = images;
  }
}
