import {ENTITIES} from '../constants/ENTITIES.constant';
import {ENTITIES_TOKEN} from '../tokens/ENTITIES.token';

export const ENTITIES_PROVIDER = {
  provide: ENTITIES_TOKEN,
  useValue: ENTITIES
};
