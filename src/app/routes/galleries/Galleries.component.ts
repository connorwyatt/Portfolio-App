import 'rxjs/add/operator/take';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Gallery} from '../../entities/Gallery.entity';

@Component({
  template: require('./Galleries.component.html'),
  styles: [require('./Galleries.component.scss')]
})
export class GalleriesComponent {
  get galleries() {
    return this._galleries;
  };

  private _galleries: Gallery[];

  constructor(route: ActivatedRoute) {
    route.data.take(1).subscribe((data: {galleries: Gallery[]}) => {
      this._galleries = data.galleries;
    });
  }
}
