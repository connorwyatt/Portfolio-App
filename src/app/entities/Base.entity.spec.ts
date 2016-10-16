import {JSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {BaseEntity} from './Base.entity';

describe('BaseEntity', () => {
  let baseEntity: BaseEntity, resource: any;

  beforeEach(() => {
    resource = {id: '1', attributes: {name: 'Test Name'}, links: {testLink: {href: '/test'}}};

    baseEntity = new BaseEntity(<JSONAPIResourceIdentifierObject<Object>>resource);
  });

  describe('id', () => {
    it('should be the id from the resource', () => {
      expect(baseEntity.id).toBe(resource.id);
    });
  });

  describe('attributes', () => {
    it('should be the attributes from the resource', () => {
      expect(baseEntity.attributes).toBe(resource.attributes);
    });
  });

  describe('Method: getLink', () => {
    let result: any;

    beforeEach(() => {
      result = baseEntity.getLink('testLink');
    });

    it('should return the link with the name passed in', () => {
      expect(result).toBe(resource.links.testLink);
    });
  });
});
