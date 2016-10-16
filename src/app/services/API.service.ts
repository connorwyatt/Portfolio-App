import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseEntity} from '../entities/Base.entity';
import {EnvService} from './Env.service';
import {ModelService} from './Model.service';

@Injectable()
export class APIService {
  private _envService: EnvService;
  private _http: Http;
  private _modelService: ModelService;

  constructor(envService: EnvService, http: Http, modelService: ModelService) {
    this._envService = envService;
    this._http = http;
    this._modelService = modelService;
  }

  getModel(url: string): Observable<BaseEntity> {
    const prefixedUrl = this._envService.apiBasePath + url;

    return this._http.get(prefixedUrl).map((response: Response) => {
      return this._modelService.createModelFromJSONAPI(response.json());
    });
  }

  getCollection(url: string): Observable<BaseEntity[]> {
    const prefixedUrl = this._envService.apiBasePath + url;

    return this._http.get(prefixedUrl).map((response: Response) => {
      return this._modelService.createCollectionFromJSONAPI(response.json());
    });
  }
}
