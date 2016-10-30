export interface IJSONAPIResourceIdentifierObject<Attributes> {
  id: string;
  type: string;
  attributes?: Attributes;
  relationships?: IJSONAPIRelationshipsObject;
  links?: IJSONAPILinksObject;
  meta?: IJSONAPIMetaObject;
}

export interface IJSONAPITopLevelLinks extends IJSONAPIPaginationLinks {
  self?: IJSONAPILink;
  related?: IJSONAPILink;
}

export interface IJSONAPILinksObject { [key: string]: IJSONAPILink; }

export type IJSONAPILink = string | IJSONAPILinkObject;

export interface IJSONAPILinkObject {
  href: string;
  meta?: IJSONAPIMetaObject;
}

export interface IJSONAPIPaginationLinks {
  first?: IJSONAPILink;
  last?: IJSONAPILink;
  prev?: IJSONAPILink;
  next?: IJSONAPILink;
}

export interface IJSONAPIRelationshipsObject { [key: string]: IJSONAPIRelationship; }

export interface IJSONAPIRelationship {
  links?: IJSONAPIRelationshipLinks;
  data?: {[key: string]: any};
  meta?: IJSONAPIMetaObject;
}

export interface IJSONAPIRelationshipLinks extends IJSONAPIPaginationLinks {
  self?: IJSONAPILink;
  related?: IJSONAPILink;
}

export interface IJSONAPIMetaObject { [key: string]: any; }

export interface IJSONAPIError {
  id?: string;
  links?: IJSONAPIErrorLinksObject;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: IJSONAPIErrorSourceObject;
  meta?: IJSONAPIMetaObject;
}

export interface IJSONAPIErrorLinksObject { about: IJSONAPILink; }

export interface IJSONAPIErrorSourceObject {
  pointer?: string;
  parameter?: string;
}

export interface IJSONAPIIJSONAPIObject {
  version: string;
  meta?: IJSONAPIMetaObject;
}

export interface IJSONAPIModelResponse<Attributes> {
  data?: IJSONAPIResourceIdentifierObject<Attributes>;
  errors?: IJSONAPIError[];
  meta?: IJSONAPIMetaObject;
  jsonapi?: IJSONAPIIJSONAPIObject;
  links?: IJSONAPITopLevelLinks;
  included?: IJSONAPIResourceIdentifierObject<Object>[];
}

export interface IJSONAPICollectionResponse<Attributes> {
  data?: IJSONAPIResourceIdentifierObject<Attributes>[];
  errors?: IJSONAPIError[];
  meta?: IJSONAPIMetaObject;
  jsonapi?: IJSONAPIIJSONAPIObject;
  links?: IJSONAPITopLevelLinks;
  included?: IJSONAPIResourceIdentifierObject<Object>[];
}
