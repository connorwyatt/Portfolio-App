import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Image} from '../../entities';

@Component({
  selector: 'image-card',
  template: require('./ImageCard.component.html'),
  styles: [require('./ImageCard.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCardComponent {
  @Input('image') private _image: Image;

  get image(): Image {
    return this._image;
  }
}
