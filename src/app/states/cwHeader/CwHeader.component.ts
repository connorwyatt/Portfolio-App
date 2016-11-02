import {Component} from '@angular/core';
import {CwSidebarService} from '../../services';

@Component({
  selector: 'cw-header',
  template: require('./CwHeader.component.html'),
  styles: [require('./CwHeader.component.scss')]
})
export class CwHeaderComponent {
  constructor(private sidebarService: CwSidebarService) {}

  public menuClick() {
    this.sidebarService.openSidebar();
  }
}
