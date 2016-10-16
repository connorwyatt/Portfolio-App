import {ENTITIES_CONSTANT} from '../constants/ENTITIES.constant';
import {ENTITIES_CONSTANT_TOKEN} from '../tokens/ENTITIES_CONSTANT.token';

export const ENTITIES_CONSTANT_PROVIDER = {
  provide: ENTITIES_CONSTANT_TOKEN,
  useValue: ENTITIES_CONSTANT
};
