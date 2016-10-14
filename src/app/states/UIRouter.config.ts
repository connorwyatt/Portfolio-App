import {Injectable} from '@angular/core';
import {Transition, UIRouter} from 'ui-router-ng2';
import {TitleService} from '../services/Title.service';

@Injectable()
export class UIRouterConfig {
  constructor(uiRouter: UIRouter, titleService: TitleService) {
    uiRouter.transitionService.onSuccess({to: '**'}, (transition: Transition) => {
      const targetState = transition.targetState().state();
      const titleKey = targetState.name;

      titleService.setTitleForState(titleKey);
    });
  }
}
