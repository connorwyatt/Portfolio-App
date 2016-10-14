import {Component, Inject} from '@angular/core';
import {Gallery} from '../../../entities/Gallery.entity';

@Component(
    {template: require('./Gallery.component.html'), styles: [require('./Gallery.component.scss')]})
export class GalleryComponent {
  get gallery(): Gallery {
    return this._gallery;
  }

  private _gallery: Gallery;

  constructor(@Inject('gallery') gallery: Gallery) {
    this._gallery = gallery;
  }
}
