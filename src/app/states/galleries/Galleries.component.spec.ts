import {Gallery} from '../../entities/Gallery.entity';
import {GalleriesComponent} from './Galleries.component';

describe('GalleriesComponent', () => {
  let galleries: GalleriesComponent, galleriesResolve: Array<Gallery>;

  beforeEach(() => {
    galleriesResolve = <Array<Gallery>>[{}, {}];

    galleries = new GalleriesComponent(galleriesResolve);
  });

  it('should be defined', () => {
    expect(galleries).toBeDefined();
  });

  it('should set the galleries', () => {
    expect(galleries.galleries).toBe(galleriesResolve);
  });
});
