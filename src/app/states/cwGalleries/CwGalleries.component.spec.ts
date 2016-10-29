import {Gallery} from '../../entities';
import {CwGalleriesComponent} from './CwGalleries.component';

describe('CwGalleriesComponent', () => {
  let cwGalleries: CwGalleriesComponent, galleriesResolve: Array<Gallery>;

  beforeEach(() => {
    galleriesResolve = <Array<Gallery>>[{}, {}];

    cwGalleries = new CwGalleriesComponent(galleriesResolve);
  });

  it('should be defined', () => {
    expect(cwGalleries).toBeDefined();
  });

  it('should set the galleries', () => {
    expect(cwGalleries.galleries).toBe(galleriesResolve);
  });
});
