import {ImageCardComponent} from './ImageCard.component';

describe('ImageCard', () => {
  let imageCard: ImageCardComponent;

  beforeEach(() => {
    imageCard = new ImageCardComponent();
  });

  it('should be defined', () => {
    expect(imageCard).toBeDefined();
  });
});
