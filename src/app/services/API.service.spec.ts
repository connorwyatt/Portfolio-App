import {Http} from '@angular/http';
import {Observable, Subject} from 'rxjs';

import {HttpMock} from '../mocks/Http.mock';

import {APIService} from './API.service';
import {EnvService} from './Env.service';
import {ModelService} from './Model.service';
import Spy = jasmine.Spy;

describe('APIService', () => {
  let apiService: APIService, envServiceMock: any, httpMock: any, modelServiceMock: any;

  beforeEach(() => {
    envServiceMock = {apiBasePath: 'http://localhost:666/api'};

    httpMock = new HttpMock();

    modelServiceMock = {
      createModelFromJSONAPI: jasmine.createSpy('createModelFromJSONAPI'),
      createCollectionFromJSONAPI: jasmine.createSpy('createCollectionFromJSONAPI')
    };

    apiService =
        new APIService(<EnvService>envServiceMock, <Http>httpMock, <ModelService>modelServiceMock);
  });

  describe('Method: getModel', () => {
    let result: any, httpObservable: Subject<{json: () => any}>, subscriberSpy: Spy;

    beforeEach(() => {
      modelServiceMock.createModelFromJSONAPI.and.returnValue('model');

      httpObservable = new Subject<{json: () => any}>();

      subscriberSpy = jasmine.createSpy('subscriber');

      httpMock.get.and.returnValue(httpObservable);

      result = apiService.getModel('/testUrl');

      result.subscribe(subscriberSpy);
    });

    it('should request the resource at the URL provided with the base path prepended', () => {
      expect(httpMock.get).toHaveBeenCalledWith('http://localhost:666/api/testUrl');
    });

    it('should return an observable', () => {
      expect(result).toEqual(jasmine.any(Observable));
    });

    describe('when the data resolves', () => {
      let response: any;

      beforeEach(() => {
        response = {};

        httpObservable.next({json: () => response});
      });

      it('should create a model using the response', () => {
        expect(modelServiceMock.createModelFromJSONAPI).toHaveBeenCalledWith(response);
      });

      it('should call the subscriber with the created model', () => {
        expect(subscriberSpy).toHaveBeenCalledWith('model');
      });
    });
  });

  describe('Method: getCollection', () => {
    let result: any, httpObservable: Subject<{json: () => any}>, subscriberSpy: Spy;

    beforeEach(() => {
      modelServiceMock.createCollectionFromJSONAPI.and.returnValue('collection');

      httpObservable = new Subject<{json: () => any}>();

      subscriberSpy = jasmine.createSpy('subscriber');

      httpMock.get.and.returnValue(httpObservable);

      result = apiService.getCollection('/testUrl');

      result.subscribe(subscriberSpy);
    });

    it('should request the resource at the URL provided with the base path prepended', () => {
      expect(httpMock.get).toHaveBeenCalledWith('http://localhost:666/api/testUrl');
    });

    it('should return an observable', () => {
      expect(result).toEqual(jasmine.any(Observable));
    });

    describe('when the data resolves', () => {
      let response: any;

      beforeEach(() => {
        response = [];

        httpObservable.next({json: () => response});
      });

      it('should create a collection using the response', () => {
        expect(modelServiceMock.createCollectionFromJSONAPI).toHaveBeenCalledWith(response);
      });

      it('should call the subscriber with the created collection', () => {
        expect(subscriberSpy).toHaveBeenCalledWith('collection');
      });
    });
  });
});
