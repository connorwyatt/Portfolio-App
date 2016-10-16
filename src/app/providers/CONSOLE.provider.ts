import {CONSOLE_TOKEN} from '../tokens/CONSOLE.token';

export const CONSOLE_PROVIDER = {
  provide: CONSOLE_TOKEN,
  useValue: window.console
};
