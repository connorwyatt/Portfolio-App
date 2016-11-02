import {Component, ViewChild, ElementRef} from '@angular/core';
import {CwSidebarService} from '../../services';

@Component({
  selector: 'cw-sidebar',
  template: require('./CwSidebar.component.html'),
  styles: [require('./CwSidebar.component.scss')]
})
export class CwSidebarComponent {
  @ViewChild('backdrop') private backdropElement: ElementRef;

  constructor(private sidebarService: CwSidebarService) {}

  public close($event: MouseEvent) {
    if ($event.target === this.backdropElement.nativeElement) {
      this.sidebarService.closeSidebar();
    }
  }
}
