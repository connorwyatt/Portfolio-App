import {Component, Inject} from '@angular/core';
import {Image} from '../../../../entities';

@Component({
  selector: 'cw-image',
  template: require('./CwImage.component.html'),
  styles: [require('./CwImage.component.scss')]
})
export class CwImageComponent {
  image: Image;

  constructor(@Inject('image') image: Image) {
    this.image = image;
  }
}
