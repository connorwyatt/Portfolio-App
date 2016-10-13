import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseEntity} from '../entities/Base.entity';
import {ModelService} from './Model.service';

@Injectable()
export class APIService {
  private _http: Http;
  private _modelService: ModelService;

  constructor(http: Http, modelService: ModelService) {
    this._http = http;
    this._modelService = modelService;
  }

  getModel(url: string): Observable<BaseEntity> {
    return this._http.get(url).map((response: Response) => {
      return this._modelService.createModelFromJSONAPI(response.json());
    });
  }

  getCollection(url: string): Observable<BaseEntity[]> {
    return this._http.get(url).map((response: Response) => {
      return this._modelService.createCollectionFromJSONAPI(response.json());
    });
  }
}
