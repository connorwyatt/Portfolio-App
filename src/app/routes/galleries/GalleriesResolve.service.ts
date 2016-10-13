import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Gallery } from '../../entities/Gallery.entity';
import { APIService } from '../../services/API.service';

@Injectable()
export class GalleriesResolveService implements Resolve<any> {
  private _apiService: APIService;

  constructor(apiService: APIService) {
    this._apiService = apiService;
  }

  resolve(): Observable<Gallery[]> {
    return <Observable<Gallery[]>>this._apiService.getCollection('/api/galleries');
  }
}
