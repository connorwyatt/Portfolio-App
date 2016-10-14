import {TITLES} from '../constants/TITLES.constant';
import {TITLES_TOKEN} from '../tokens/TITLES.token';

export const TITLES_PROVIDER = {
  provide: TITLES_TOKEN,
  useValue: TITLES
};
