import {Injectable} from '@angular/core';
import {Transition, UIRouter} from 'ui-router-ng2';
import {CwTitleService} from '../services';

@Injectable()
export class UIRouterConfig {
  constructor(uiRouter: UIRouter, titleService: CwTitleService) {
    uiRouter.transitionService.onSuccess({to: '**'}, (transition: Transition) => {
      const targetState = transition.targetState().state();
      const titleKey = targetState.name;

      titleService.setTitleForState(titleKey);
    });
  }
}
