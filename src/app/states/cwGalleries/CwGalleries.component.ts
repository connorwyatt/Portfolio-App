import {Component, Inject} from '@angular/core';
import {Gallery} from '../../entities';

@Component({
  selector: 'cw-galleries',
  template: require('./CwGalleries.component.html'),
  styles: [require('./CwGalleries.component.scss')]
})
export class CwGalleriesComponent {
  galleries: Array<Gallery>;

  constructor(@Inject('galleries') galleries: Array<Gallery>) {
    this.galleries = galleries;
  }
}
