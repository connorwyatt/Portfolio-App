import {Injectable} from '@angular/core';

@Injectable()
export class CwSidebarService {
  public get isOpen(): boolean { return this.open; };

  private open: boolean = false;

  public openSidebar() {
    this.open = true;
  }

  public closeSidebar() {
    this.open = false;
  }
}
