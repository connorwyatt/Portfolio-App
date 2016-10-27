import {Component, Input} from '@angular/core';

@Component({
  selector: 'cw-button',
  template: require('./CwButton.component.html'),
  styles: [require('./CwButton.component.scss')]
})
export class CwButtonComponent {
  get modifier(): string{return this._modifier};
  get text(): string{return this._text};
  get state(): string{return this._state};
  get stateParams(): {[key: string]: any} {return this._stateParams};

  @Input('modifier') private _modifier: string;
  @Input('text') private _text: string;
  @Input('state') private _state: string;
  @Input('stateParams') private _stateParams: {[key: string]: any};
}
