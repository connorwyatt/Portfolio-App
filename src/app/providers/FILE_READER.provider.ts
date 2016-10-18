import {FILE_READER_TOKEN} from '../tokens/FILE_READER.token';

export const FILE_READER_PROVIDER = {
  provide: FILE_READER_TOKEN,
  useValue: FileReader
};
