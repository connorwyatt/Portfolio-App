import {constant} from 'lodash';
import {UIRouter} from 'ui-router-ng2';
import {CwTitleService} from '../services';
import {UIRouterConfig} from './UIRouter.config';

describe('UIRouterConfig', () => {
  let uiRouterConfig: UIRouterConfig;
  let uiRouter: any;
  let titleService: any;

  beforeEach(() => {
    uiRouter = {transitionService: {onSuccess: jasmine.createSpy('onSuccess')}};

    titleService = {setTitleForState: jasmine.createSpy('setTitleForState')};

    uiRouterConfig = new UIRouterConfig(uiRouter as UIRouter, titleService as CwTitleService);
  });

  it('should be defined', () => {
    expect(uiRouterConfig).toBeDefined();
  });

  it('should register a function as an onSuccess callback for all states', () => {
    expect(uiRouter.transitionService.onSuccess)
        .toHaveBeenCalledWith({to: '**'}, jasmine.any(Function));
  });

  describe('when the onSuccess callback is called', () => {
    beforeEach(() => {
      const onSuccessCallback = uiRouter.transitionService.onSuccess.calls.argsFor(0)[1];

      onSuccessCallback({targetState: constant({state: constant({name: 'app.home'})})});
    });

    it('should set the title for the state', () => {
      expect(titleService.setTitleForState).toHaveBeenCalledWith('app.home');
    });
  });
});
