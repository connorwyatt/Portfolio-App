import {Ng2StateDeclaration} from 'ui-router-ng2';
import {CwLoginComponent} from './CwLogin.component';

export const CwLoginState: Ng2StateDeclaration = {
  name: 'login',
  parent: 'app',
  url: '^/login',
  views: {'main@': {component: CwLoginComponent}}
};

export const CwLoginStates: Array<Ng2StateDeclaration> = [CwLoginState];
