import {CwImageCardComponent} from './CwImageCard.component';

describe('ImageCard', () => {
  let cwImageCard: CwImageCardComponent;

  beforeEach(() => {
    cwImageCard = new CwImageCardComponent();
  });

  it('should be defined', () => {
    expect(cwImageCard).toBeDefined();
  });
});
