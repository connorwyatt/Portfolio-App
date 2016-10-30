import {IJSONAPIResourceIdentifierObject} from '../interfaces/JSONAPI';
import {BaseEntity} from './Base.entity';

describe('BaseEntity', () => {
  let baseEntity: BaseEntity, resource: any;

  beforeEach(() => {
    resource = {
      id: '1',
      attributes: {name: 'Test Name'},
      links: {testLink: {href: '/testLink'}, stringLink: '/stringLink'}
    };

    baseEntity = new BaseEntity();
    baseEntity.initialise(<IJSONAPIResourceIdentifierObject<Object>>resource);
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
    describe('when getting a link that was a link object in the response', () => {
      let result: any;

      beforeEach(() => {
        result = baseEntity.getLink('testLink');
      });

      it('should return the link object with the name passed in', () => {
        expect(result).toBe(resource.links.testLink);
      });
    });

    describe('when getting a link that was a string in the response', () => {
      let result: any;

      beforeEach(() => {
        result = baseEntity.getLink('stringLink');
      });

      it('should return the link object with the name passed in', () => {
        expect(result).toEqual({href: resource.links.stringLink});
      });
    });
  });
});
