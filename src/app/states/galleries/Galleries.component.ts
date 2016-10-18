import {Component, Inject} from '@angular/core';
import {Gallery} from '../../entities';

@Component({
  selector: 'galleries',
  template: require('./Galleries.component.html'),
  styles: [require('./Galleries.component.scss')]
})
export class GalleriesComponent {
  get galleries(): Array<Gallery>{return this._galleries};

  private _galleries: Array<Gallery>;

  constructor(@Inject('galleries') galleries: Array<Gallery>) {
    this._galleries = galleries;
  }
}
