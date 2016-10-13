import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {BaseEntity} from './Base.entity';

describe('BaseEntity', () => {
  let baseEntity: BaseEntity, resource: any;

  beforeEach(() => {
    resource = {attributes: {name: 'Test Name'}};

    baseEntity = new BaseEntity(<JSONAPIResourceIdentifierObject<Object>>resource);
  });

  describe('attributes', () => {
    it('should be the attributes from the resource', () => {
      expect(baseEntity.attributes).toBe(resource.attributes);
    });
  });
});
