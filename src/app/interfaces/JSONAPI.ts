export interface JSONAPIResourceIdentifierObject<Attributes> {
  id: string;
  type: string;
  attributes?: Attributes;
  relationships?: JSONAPIRelationshipsObject;
  links?: JSONAPILinksObject;
  meta?: JSONAPIMetaObject;
}

export interface JSONAPITopLevelLinks extends JSONAPIPaginationLinks {
  self?: JSONAPILink;
  related?: JSONAPILink;
}

export interface JSONAPILinksObject { [key: string]: JSONAPILink; }

export type JSONAPILink = string | JSONAPILinkObject;

export interface JSONAPILinkObject {
  href: string;
  meta?: JSONAPIMetaObject;
}

export interface JSONAPIPaginationLinks {
  first?: JSONAPILink;
  last?: JSONAPILink;
  prev?: JSONAPILink;
  next?: JSONAPILink;
}

export interface JSONAPIRelationshipsObject { [key: string]: JSONAPIRelationship; }

export interface JSONAPIRelationship {
  links?: JSONAPIRelationshipLinks;
  data?: {[key: string]: any};
  meta?: JSONAPIMetaObject;
}

export interface JSONAPIRelationshipLinks extends JSONAPIPaginationLinks {
  self?: JSONAPILink;
  related?: JSONAPILink;
}

export interface JSONAPIMetaObject { [key: string]: any; }

export interface JSONAPIError {
  id?: string;
  links?: JSONAPIErrorLinksObject;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: JSONAPIErrorSourceObject;
  meta?: JSONAPIMetaObject;
}

export interface JSONAPIErrorLinksObject { about: JSONAPILink; }

export interface JSONAPIErrorSourceObject {
  pointer?: string;
  parameter?: string;
}

export interface JSONAPIJSONAPIObject {
  version: string;
  meta?: JSONAPIMetaObject;
}

export interface JSONAPIModelResponse<Attributes> {
  data?: JSONAPIResourceIdentifierObject<Attributes>;
  errors?: JSONAPIError[];
  meta?: JSONAPIMetaObject;
  jsonapi?: JSONAPIJSONAPIObject;
  links?: JSONAPITopLevelLinks;
  included?: JSONAPIResourceIdentifierObject<Object>[];
}

export interface JSONAPICollectionResponse<Attributes> {
  data?: JSONAPIResourceIdentifierObject<Attributes>[];
  errors?: JSONAPIError[];
  meta?: JSONAPIMetaObject;
  jsonapi?: JSONAPIJSONAPIObject;
  links?: JSONAPITopLevelLinks;
  included?: JSONAPIResourceIdentifierObject<Object>[];
}
