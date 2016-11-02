import {animate, Component, style, transition, trigger} from '@angular/core';

import {CwSidebarService} from '../services';

@Component({
  selector: 'cw-app',
  template: require('./CwApp.component.html'),
  styles: [require('./CwApp.component.scss')],
  animations: [
    trigger(
        'fade',
        [
          transition(':enter', [style({opacity: 0}), animate('400ms ease-in-out')]),
          transition(':leave', [animate('400ms ease-in-out', style({opacity: 0}))])
        ]),
    trigger(
        'flyLeft',
        [
          transition(
              ':enter', [style({transform: 'translateX(-100%)'}), animate('100ms ease-in-out')]),
          transition(
              ':leave', [animate('100ms ease-in-out', style({transform: 'translateX(-100%)'}))])
        ])
  ]

})
export class CwAppComponent {
  public get showSidebar(): boolean {
    return this.sidebarService.isOpen;
  }

  constructor(private sidebarService: CwSidebarService) {}

  public closeSidebar() {
    this.sidebarService.closeSidebar();
  }
}
