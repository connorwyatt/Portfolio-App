import {Component, Input} from '@angular/core';

@Component({
  selector: 'cw-button',
  template: require('./CwButton.component.html'),
  styles: [require('./CwButton.component.scss')]
})
export class CwButtonComponent {
  @Input() modifier: string;
  @Input() text: string;
  @Input() state: string;
  @Input() stateParams: {[key: string]: any};
}
