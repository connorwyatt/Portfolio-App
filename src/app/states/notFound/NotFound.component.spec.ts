import {NotFoundComponent} from './NotFound.component';

describe('NotFoundComponent', () => {
  let notFound: NotFoundComponent;

  beforeEach(() => {
    notFound = new NotFoundComponent();
  });

  it('should be defined', () => {
    expect(notFound).toBeDefined();
  });
});
