import {Injectable} from '@angular/core';
import {Http, Response, ResponseContentType} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JSONAPILinkObject} from '../interfaces/JSONAPI';
import {CwFileService} from '../services';
import {BaseEntity} from './Base.entity';

export interface ImageAttributes {
  name: string;
  description: string;
}

export interface ImageObject {
  base64: string;
  blob: Blob;
  width: number;
  height: number;
}

@Injectable()
export class Image extends BaseEntity {
  attributes: ImageAttributes;

  private _http: Http;
  private _fileService: CwFileService;
  private _imageSubjects: Map<JSONAPILinkObject, BehaviorSubject<ImageObject>>;

  constructor(http: Http, fileService: CwFileService) {
    super();
    this._http = http;
    this._fileService = fileService;
    this._imageSubjects = new Map<JSONAPILinkObject, BehaviorSubject<ImageObject>>();
  }

  getThumbnailImage(): Observable<ImageObject> {
    const link = this.getLink('thumbnailImage');

    return this._getImage(link);
  }

  getMediumImage(): Observable<ImageObject> {
    const link = this.getLink('mediumImage');

    return this._getImage(link);
  }

  getOriginalImage(): Observable<ImageObject> {
    const link = this.getLink('originalImage');

    return this._getImage(link);
  }

  private _getImage(link: JSONAPILinkObject): Observable<ImageObject> {
    if (this._imageSubjects.has(link)) {
      return this._imageSubjects.get(link);
    }

    const imageSubject = new BehaviorSubject<ImageObject>(null);

    this._http.get(link.href, {responseType: ResponseContentType.Blob})
        .subscribe((response: Response) => {
          const blob = response.blob();

          this._fileService.readFile(blob).subscribe((base64) => {
            imageSubject.next(
                {base64, blob, width: link.meta['width'], height: link.meta['height']});
          });
        });

    this._imageSubjects.set(link, imageSubject);

    return imageSubject;
  }
}
