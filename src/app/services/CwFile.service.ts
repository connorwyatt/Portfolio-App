import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FILE_READER_TOKEN} from '../tokens/FILE_READER.token';

@Injectable()
export class CwFileService {
  constructor(@Inject(FILE_READER_TOKEN) private fileReader: typeof FileReader) {}

  public readFile(blob: Blob): Observable<string> {
    const subject = new Subject();

    const reader = new this.fileReader();
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
