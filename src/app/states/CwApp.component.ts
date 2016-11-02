import {Component} from '@angular/core';
import {CwSidebarService} from '../services';

@Component({
  selector: 'cw-app',
  template: require('./CwApp.component.html'),
  styles: [require('./CwApp.component.scss')]
})
export class CwAppComponent {
  public get showSidebar(): boolean { return this.sidebarService.isOpen; };

  constructor(private sidebarService: CwSidebarService) {}
}
