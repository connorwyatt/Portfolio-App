import { GalleriesComponent } from './Galleries.component';

describe('GalleriesComponent', () => {
  let galleries: GalleriesComponent;

  beforeEach(() => {
    galleries = new GalleriesComponent();
  });

  it('should be defined', () => {
    expect(galleries).toBeDefined();
  });
});
