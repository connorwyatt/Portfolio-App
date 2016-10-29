import {Component, Input} from '@angular/core';
import {Image} from '../../entities';

@Component({
  selector: 'cw-image-card',
  template: require('./CwImageCard.component.html'),
  styles: [require('./CwImageCard.component.scss')]
})
export class CwImageCardComponent {
  @Input('image') image: Image;
}
