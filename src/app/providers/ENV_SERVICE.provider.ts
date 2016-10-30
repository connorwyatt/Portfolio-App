import {CwEnvService} from '../services';

export const ENV_SERVICE_PROVIDER = {
  provide: CwEnvService,
  useValue: new CwEnvService(ENV, API_BASE_PATH)
};
