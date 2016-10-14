import {Injectable} from '@angular/core';
import {compact} from 'lodash';
import {Transition, UIRouter} from 'ui-router-ng2';

import {TitleService} from '../services/Title.service';

@Injectable()
export class UIRouterConfig {
  constructor(uiRouter: UIRouter, titleService: TitleService) {
    uiRouter.transitionService.onSuccess({to: '**'}, (transition: Transition) => {
      const targetState = transition.targetState().state();
      let titleKeyParts = [<string>targetState.parent, targetState.name];

      titleKeyParts = compact(titleKeyParts);

      const titleKey = titleKeyParts.join('.');

      titleService.setTitleForState(titleKey);
    });
  }
}
