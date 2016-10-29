import {Component, Inject} from '@angular/core';
import {Gallery, Image} from '../../../entities';

@Component({
  selector: 'cw-gallery',
  template: require('./CwGallery.component.html'),
  styles: [require('./CwGallery.component.scss')]
})
export class CwGalleryComponent {
  gallery: Gallery;
  images: Array<Image>;

  constructor(@Inject('gallery') gallery: Gallery, @Inject('images') images: Array<Image>) {
    this.gallery = gallery;
    this.images = images;
  }
}
