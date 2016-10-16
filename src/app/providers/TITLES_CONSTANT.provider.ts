import {TITLES_CONSTANT} from '../constants/TITLES.constant';
import {TITLES_CONSTANT_TOKEN} from '../tokens/TITLES_CONSTANT.token';

export const TITLES_CONSTANT_PROVIDER = {
  provide: TITLES_CONSTANT_TOKEN,
  useValue: TITLES_CONSTANT
};
