import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseEntity} from '../entities';
import {CwEnvService} from './CwEnv.service';
import {CwModelService} from './CwModel.service';

@Injectable()
export class CwAPIService {
  constructor(
      private envService: CwEnvService, private http: Http, private modelService: CwModelService) {}

  public getModel(url: string): Observable<BaseEntity> {
    const prefixedUrl = this.envService.apiBasePath + url;

    return this.http.get(prefixedUrl).map((response: Response) => {
      return this.modelService.createModelFromJSONAPI(response.json());
    });
  }

  public getCollection(url: string): Observable<BaseEntity[]> {
    const prefixedUrl = this.envService.apiBasePath + url;

    return this.http.get(prefixedUrl).map((response: Response) => {
      return this.modelService.createCollectionFromJSONAPI(response.json());
    });
  }
}
