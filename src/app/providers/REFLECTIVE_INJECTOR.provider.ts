import {ReflectiveInjector} from '@angular/core';
import {REFLECTIVE_INJECTOR_TOKEN} from '../tokens/REFLECTIVE_INJECTOR.token';

export const REFLECTIVE_INJECTOR_PROVIDER = {
  provide: REFLECTIVE_INJECTOR_TOKEN,
  useValue: ReflectiveInjector
};
