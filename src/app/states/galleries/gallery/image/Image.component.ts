import {Component, Inject} from '@angular/core';
import {Image} from '../../../../entities';

@Component(
    {selector: 'image',template: require('./Image.component.html'), styles: [require('./Image.component.scss')]})
export class ImageComponent {
  get image(): Image {
    return this._image;
  }

  private _image: Image;

  constructor(@Inject('image') image: Image) {
    this._image = image;
  }
}
