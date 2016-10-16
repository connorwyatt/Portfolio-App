import {Injector, Provider, ReflectiveInjector} from '@angular/core';
import {BaseEntity, Gallery, Image} from './';

export * from './Base.entity';
export * from './Gallery.entity';
export * from './Image.entity';

export const ENTITIES_PROVIDERS: Array<Provider> =
    [BaseEntity, Gallery, Image].map((EntityToken: typeof BaseEntity) => {
      return {
        provide: EntityToken,
        useFactory: (injector: Injector) => {
          const reflectiveInjector = ReflectiveInjector.resolveAndCreate([EntityToken], injector);

          return reflectiveInjector.resolveAndInstantiate(EntityToken);
        },
        deps: [Injector]
      };
    });
