import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {FILE_READER_TOKEN} from '../tokens/FILE_READER.token';

@Injectable()
export class FileService {
  private _FileReader: typeof FileReader;

  constructor(@Inject(FILE_READER_TOKEN) _FileReader: typeof FileReader) {
    this._FileReader = _FileReader;
  }

  readFile(blob: Blob): Observable<string> {
    const subject = new Subject();

    const reader = new this._FileReader();
    reader.onloadend = () => {
      subject.next(reader.result);
      subject.complete();
    };
    reader.onerror = (error: Event) => {
      subject.error(error);
    };
    reader.readAsDataURL(blob);

    return subject;
  }
}
