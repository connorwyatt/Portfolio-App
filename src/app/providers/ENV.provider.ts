import {EnvService} from '../services/Env.service';

export const ENV_PROVIDER = {
  provide: EnvService,
  useValue: new EnvService(ENV, API_BASE_PATH)
};
